import { TRPCError } from '@trpc/server';
import argon2 from 'argon2';
import crypto from 'crypto';
import { BaseService } from '../service';
import { MailQueueService } from '../mail/mailQueueService';
import { MAIL_ACTIONS } from '../mail/types';
import { CodeType } from '@prisma/client';
import { RequestPasswordResetInput, ResetPasswordInput } from '@portfolio/shared';
import { PasswordResetting } from './types';

export class PasswordResetService extends BaseService implements PasswordResetting {
  private mailQueue = MailQueueService.getInstance();

  public async requestReset(input: RequestPasswordResetInput): Promise<{ message: string }> {
    const { email } = input;

    const user = await this.db.user.findUnique({ where: { email } });

    if (!user) {
     this.logger.info(`Password reset requested for non-existent email`, { email });
      return { message: 'If an account exists with this email, a reset link has been sent.' };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await this.db.verificationCode.deleteMany({
      where: { userId: user.id, type: CodeType.PASSWORD_RESET }
    });

    await this.db.verificationCode.create({
      data: {
        code: token,
        type: CodeType.PASSWORD_RESET,
        expiresAt,
        userId: user.id,
      }
    });

    await this.mailQueue.addJob(MAIL_ACTIONS.PASSWORD_RESET, {
      user,
      resetToken: token,
      expiryMinutes: 60
    });

    return { message: 'If an account exists with this email, a reset link has been sent.' };
  }

  public async reset(input: ResetPasswordInput): Promise<{ success: true }> {
    const { token, password } = input;

    const verification = await this.db.verificationCode.findFirst({
      where: {
        code: token,
        type: CodeType.PASSWORD_RESET,
        expiresAt: { gt: new Date() },
      }
    });

    if (!verification) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid or expired reset token'
      });
    }

    const passwordDigest = await argon2.hash(password);

    await this.db.$transaction([
      this.db.user.update({
        where: { id: verification.userId },
        data: { passwordDigest }
      }),
      this.db.verificationCode.deleteMany({
        where: { userId: verification.userId, type: CodeType.PASSWORD_RESET }
      })
    ]);

    this.logger.info(`Password reset successful`, { userId: verification.userId });
    return { success: true };
  }

  public async resendReset(input: RequestPasswordResetInput): Promise<{ message: string }> {
    const lockKey = `resend_lock:reset:${input.email}`;
    const isLocked = await this.cache.get(lockKey);

    if (isLocked) {
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: 'Please wait a minute before requesting a new link.'
      });
    }

    const result = await this.requestReset(input);
    await this.cache.set(lockKey, 'true', 60);

    return result;
  }
}
