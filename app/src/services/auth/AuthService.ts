import { TRPCError } from "@trpc/server";
import type { User } from "@prisma/client";
import argon2 from "argon2";
import { Authenticator } from "../../trpc/auth/authenticator";
import { Permission } from "../../trpc/permission/permission";
import { UserProfileSchema } from "@portfolio/shared";
import { MailQueueService } from "../mail/mailQueueService";
import type {
  LoginResponse,
  LoginInput,
  VerifyTwoFactorInput,
  Resend2FAInput,
} from "@portfolio/shared";
import { BaseService } from "../service";
import { Authenticating } from "./types";
import { MAIL_ACTIONS } from "../mail/types";
import { CodeType } from "@prisma/client";
import { userAuthQuery } from "./queries";

export class AuthService extends BaseService implements Authenticating {
  private mailQueue = MailQueueService.getInstance();

  public async login(input: LoginInput): Promise<LoginResponse> {
    const { email, password } = input;

    const user = await this.db.user.findUnique({
      where: { email },
      ...userAuthQuery,
    });

    if (!user) {
      this.logger.warn(`Login attempt failed: user not found`, { email });
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }

    const isValidPassword = await argon2.verify(user.passwordDigest, password);
    if (!isValidPassword) {
      this.logger.warn(`Login attempt failed: invalid password`, {
        userId: user.id,
      });
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }

    if (user.twoFactorEnabled) {
      return this.handleTwoFactorFlow(user);
    }

    return this.generateSuccessResponse(user);
  }

  public async verify2FA(input: VerifyTwoFactorInput): Promise<LoginResponse> {
    const { userId, code } = input;

    const verification = await this.db.verificationCode.findFirst({
      where: {
        userId,
        code,
        type: CodeType.TWO_FACTOR,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!verification) {
      this.logger.warn(`Invalid or expired 2FA code attempt`, { userId });
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired verification code",
      });
    }

    await this.db.verificationCode.delete({
      where: { id: verification.id },
    });

    await this.cache.del(`2fa:${userId}`);

    this.logger.info(`2FA verified successfully for user`, { userId });
    return this.generateSuccessResponse(verification.user);
  }

  public async resend2FACode(
    input: Resend2FAInput,
  ): Promise<{ message: string }> {
    const { userId } = input;

    const lockKey = `resend_lock:2fa:${userId}`;
    const isLocked = await this.cache.get(lockKey);

    if (isLocked) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Please wait a minute before requesting a new code.",
      });
    }

    const user = await this.db.user.findUnique({ where: { id: userId } });
    if (!user || !user.twoFactorEnabled) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found or 2FA disabled",
      });
    }

    await this.handleTwoFactorFlow(user);
    await this.cache.set(lockKey, "true", 60);

    return { message: "New verification code sent." };
  }

  private async handleTwoFactorFlow(user: User): Promise<LoginResponse> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.db.$transaction([
      this.db.verificationCode.deleteMany({
        where: { userId: user.id, type: CodeType.TWO_FACTOR },
      }),
      this.db.verificationCode.create({
        data: {
          code,
          type: CodeType.TWO_FACTOR,
          expiresAt,
          userId: user.id,
        },
      }),
    ]);

    await this.cache.set(`2fa:${user.id}`, code, 300);

    try {
      await this.mailQueue.addJob(MAIL_ACTIONS.TWO_FACTOR_CODE, {
        user,
        code,
      });
      this.logger.info(`2FA Code generated and queued`, { userId: user.id });
    } catch (err) {
      this.logger.error("Failed to queue 2FA email", err, { userId: user.id });
    }

    return {
      status: "processing",
      userId: user.id,
      message: "Two-factor authentication required",
    };
  }

  public async logout(token: string): Promise<{ success: true }> {
    const authenticator = Authenticator.getInstance();
    const ttl = authenticator.getTokenRemainingTTL(token);

    if (ttl > 0) {
      await this.cache.set(`blacklist:${token}`, "1", ttl);
      this.logger.info("User logged out and token blacklisted", { ttl });
    }

    return { success: true };
  }

  private async generateSuccessResponse(user: User): Promise<LoginResponse> {
    const permissions = Permission.fromJSON(user.id, user.role, []);
    const authenticator = Authenticator.getInstance();
    const token = authenticator.sign(permissions, user.id);

    if (!token) {
      this.logger.error(`Failed to generate token`, undefined, {
        userId: user.id,
      });
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to generate session token",
      });
    }

    this.logger.info(`User logged in successfully`, { userId: user.id });

    return {
      status: "success",
      token,
      user: UserProfileSchema.parse(user),
    };
  }
}
