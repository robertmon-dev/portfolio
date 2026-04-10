import { BaseService } from "../service";
import { MailQueueService } from "./mailQueueService";
import type { ContactFormInput } from "@portfolio/shared";
import { MAIL_ACTIONS } from "./types";

export class SubmitContactService extends BaseService {
  async execute(input: ContactFormInput) {
    const mailQueue = MailQueueService.getInstance();
    const ticketId = `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    await mailQueue.addBulk([
      {
        name: MAIL_ACTIONS.CONTACT_CONFIRMATION,
        data: {
          senderName: input.name,
          senderEmail: input.email,
          subject: input.subject,
          messageSnippet: input.message.substring(0, 100),
          ticketId,
        },
      },
      {
        name: MAIL_ACTIONS.CONTACT_FORM_ADMIN_ALERT,
        data: {
          senderName: input.name,
          senderEmail: input.email,
          subject: input.subject,
          fullMessage: input.message,
          adminEmail: process.env.MAIL_FROM as string,
        },
      },
    ]);

    return { success: true, ticketId };
  }
}
