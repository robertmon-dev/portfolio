import { WorkerOptions, Job } from "bullmq";
import { BaseWorker } from "../../infrastructure/worker/baseWorker";
import { MailSenderService } from "../../infrastructure/mailer/mailer";
import type { Mailing } from "../../infrastructure/mailer/types";
import type { Settings } from "../../core/settings/settings";
import type { PrismaClient } from "@prisma/client";
import type { Caching } from "../../infrastructure/cache/types";
import {
  MAIL_ACTIONS,
  type MailActionMap,
  type MailSendResult,
  type MailSend,
  type MailJobUnion,
} from "./types";

export class MailQueueWorker extends BaseWorker<
  MailActionMap,
  MailSendResult,
  MailSend
> {
  private mailer: Mailing;

  public constructor(
    private readonly db: PrismaClient,
    private readonly cache: Caching,
    private readonly settings: Settings["config"],
    options?: Partial<WorkerOptions>,
  ) {
    super("mail-queue", options);

    this.mailer = new MailSenderService(
      this.db,
      this.cache,
      this.logger,
      settings,
    );
  }

  protected async process(
    job: Job<MailActionMap[MailSend], MailSendResult, MailSend>,
  ): Promise<MailSendResult> {
    const jobPacket = { name: job.name, data: job.data } as MailJobUnion;
    const baseUrl = this.settings.APP_URL;

    try {
      switch (jobPacket.name) {
        case MAIL_ACTIONS.WELCOME: {
          const { user, verificationUrl, locale } = jobPacket.data;

          if (!user.email)
            throw new Error(`User ${user.id} has no email address`);

          const fullUrl = verificationUrl.startsWith("http")
            ? verificationUrl
            : `${baseUrl}${verificationUrl}`;

          await this.mailer.sendWelcomeEmail(
            user.email,
            user.name,
            fullUrl,
            locale,
          );
          break;
        }

        case MAIL_ACTIONS.PASSWORD_RESET: {
          const { user, resetToken, expiryMinutes, locale } = jobPacket.data;
          if (!user.email)
            throw new Error(`User ${user.id} has no email address`);

          await this.mailer.sendResetPassword(
            user.email,
            user.name,
            resetToken,
            expiryMinutes,
            locale,
          );
          break;
        }

        case MAIL_ACTIONS.TWO_FACTOR_CODE: {
          const { user, code, locale } = jobPacket.data;
          if (!user.email)
            throw new Error(`User ${user.id} has no email address`);

          await this.mailer.send2FACode(user.email, code, locale);
          break;
        }

        case MAIL_ACTIONS.CONTACT_CONFIRMATION: {
          const { senderEmail, senderName, messageSnippet, locale } =
            jobPacket.data;
          await this.mailer.sendContactConfirmation(
            senderEmail ?? "",
            senderName ?? "User",
            messageSnippet ?? "",
            locale,
          );
          break;
        }

        case MAIL_ACTIONS.CONTACT_FORM_ADMIN_ALERT: {
          const {
            senderEmail,
            senderName,
            subject,
            fullMessage,
            adminEmail,
            locale,
          } = jobPacket.data;

          await this.mailer.sendAdminContactAlert(adminEmail, {
            senderEmail,
            senderName,
            subject,
            message: fullMessage,
            ip: "",
            locale: locale,
          });
          break;
        }
      }

      return {
        success: true,
        messageId: `msg_${crypto.randomUUID()}`,
        sentAt: new Date(),
        provider: "nodemailer",
      };
    } catch (error) {
      this.logger.error(`Mail job ${job.id} failed:`, error);
      throw error;
    }
  }
}
