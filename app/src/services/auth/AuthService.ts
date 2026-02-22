import { TRPCError } from '@trpc/server';
import type { User } from '@prisma/client';
import argon2 from 'argon2';
import { Authenticator } from '../../trpc/auth/authenticator';
import { Permission } from '../../trpc/permission/permission';
import { UserProfileSchema } from '@portfolio/shared';
import { MailQueueService } from '../mail/mailQueueService';
import type { LoginResponse, LoginInput } from '@portfolio/shared';
import { BaseService } from '../service';
import { Authenticating } from './types';
import { MAIL_ACTIONS } from '../mail/types';
import { CodeType } from '@prisma/client';

export class AuthService extends BaseService implements Authenticating {
  private mailQueue = MailQueueService.getInstance();

  public async login(input: LoginInput): Promise<LoginResponse> {
    const { email, password } = input;

    const user = await this.db.user.findUnique({
      where: { email },
    });

    if (!user) {
      this.logger.warn(`Login attempt failed: user not found`, { email });
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid email or password' });
    }

    const isValidPassword = await argon2.verify(user.passwordDigest, password);
    if (!isValidPassword) {
      this.logger.warn(`Login attempt failed: invalid password`, { userId: user.id });
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid email or password' });
    }

    if (user.twoFactorEnabled) {
      return this.handleTwoFactorFlow(user);
    }

    return this.generateSuccessResponse(user);
  }

  private async handleTwoFactorFlow(user: User): Promise<LoginResponse> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.db.$transaction([
      this.db.verificationCode.deleteMany({
        where: { userId: user.id, type: CodeType.TWO_FACTOR }
      }),
      this.db.verificationCode.create({
        data: {
          code,
          type: CodeType.TWO_FACTOR,
          expiresAt,
          userId: user.id,
        }
      })
    ]);

    await this.cache.set(`2fa:${user.id}`, code, 300);

    try {
      await this.mailQueue.addJob(MAIL_ACTIONS.TWO_FACTOR_CODE, {
        user,
        code
      });
      this.logger.info(`2FA Code generated and queued`, { userId: user.id });
    } catch (err) {
      this.logger.error('Failed to queue 2FA email', err, { userId: user.id });
    }

    return {
      status: 'processing',
      userId: user.id,
      message: 'Two-factor authentication required',
    };
  }

  private async generateSuccessResponse(user: User): Promise<LoginResponse> {
    const permissions = Permission.fromJSON(user.id, user.role, []);
    const authenticator = Authenticator.getInstance();
    const token = authenticator.sign(permissions, user.id);

    if (!token) {
      this.logger.error(`Failed to generate token`, undefined, { userId: user.id });
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to generate session token',
      });
    }

    this.logger.info(`User logged in successfully`, { userId: user.id });

    return {
      status: 'success',
      token,
      user: UserProfileSchema.parse(user),
    };
  }
}
