import { WorkerOptions, Job } from "bullmq";
import { BaseWorker } from "../../infrastructure/worker/baseWorker";
import type { MailActionMap, MailSend, MailSendResult, MailJobUnion } from "./types";

export class MailQueueWorker extends BaseWorker<MailActionMap, MailSendResult, MailSend> {
  public constructor(options?: Partial<WorkerOptions>) {
    super('mail-queue', options);
  }

  protected async process(job: Job<MailActionMap[MailSend], MailSendResult, MailSend>): Promise<MailSendResult> {
    const jobPacket = { name: job.name, data: job.data } as MailJobUnion;

    switch (jobPacket.name) {

      case 'WELCOME_EMAIL': {
        const { user, verificationUrl } = jobPacket.data;

        this.logger.info(`Sending welcome to ${user.firstName} (${user.email})`);
        break;
      }

      case 'MARKETING_AD': {
        const { user, offerTitle, discountCode } = jobPacket.data;

        this.logger.info(`Sending offer: ${offerTitle} to ${user.email} [Code: ${discountCode ?? 'NONE'}]`);
        break;
      }

      case 'CONTACT_FORM_CONFIRMATION': {
        const { ticketId, senderEmail } = jobPacket.data;

        this.logger.info(`Confirming ticket ${ticketId} for ${senderEmail}`);
        break;
      }

      case 'PASSWORD_RESET': {
        const { resetToken, user } = jobPacket.data;
        this.logger.info(`Reset link for ${user.email}: token=${resetToken}`);
        break;
      }

    }

    return {
      success: true,
      messageId: `id-${Date.now()}`,
      sentAt: new Date(),
      provider: 'postmark'
    };
  }
}
