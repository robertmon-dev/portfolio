import { WorkerOptions, Job } from "bullmq";
import { BaseWorker } from "../../infrastructure/worker/baseWorker";
import {
  MAIL_ACTIONS,
  type MailActionMap,
  type MailSendResult,
  type MailSend,
  type MailJobUnion
} from "./types";

export class MailQueueWorker extends BaseWorker<MailActionMap, MailSendResult, MailSend> {
  public constructor(options?: Partial<WorkerOptions>) {
    super('mail-queue', options);
  }

  protected async process(job: Job<MailActionMap[MailSend], MailSendResult, MailSend>): Promise<MailSendResult> {
    const jobPacket = { name: job.name, data: job.data } as MailJobUnion;

    switch (jobPacket.name) {
      case MAIL_ACTIONS.WELCOME: {
        const { user, verificationUrl } = jobPacket.data;

        this.logger.info(`Sending welcome to ${user.name} (${user.email})`, { verificationUrl });
        break;
      }

      case MAIL_ACTIONS.MARKETING: {
        const { user, offerTitle, discountCode } = jobPacket.data;

        this.logger.info(`Sending offer: ${offerTitle} to ${user.email}`, { discountCode });
        break;
      }

      case MAIL_ACTIONS.CONTACT_CONFIRMATION: {
        const { ticketId, senderEmail } = jobPacket.data;

        this.logger.info(`Confirming ticket ${ticketId} for ${senderEmail}`);
        break;
      }

      case MAIL_ACTIONS.PASSWORD_RESET: {
        const { resetToken, user } = jobPacket.data;

        this.logger.info(`Reset link for ${user.email}`, { token: resetToken });
        break;
      }
    }

    return {
      success: true,
      messageId: `msg_${crypto.randomUUID()}`,
      sentAt: new Date(),
      provider: 'postmark'
    };
  }
}
