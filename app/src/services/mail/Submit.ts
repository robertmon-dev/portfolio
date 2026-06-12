import { BaseService } from "../service";
import { MailQueueService } from "./mailQueueService";
import type { ContactFormInput } from "@portfolio/shared";
import { MAIL_ACTIONS } from "./types";
import { Settings } from "src/core/settings/settings";
import { randomUUID } from "crypto";

export class SubmitContactService extends BaseService<
  ContactFormInput,
  { success: boolean; ticketId: string }
> {
  async execute(
    input: ContactFormInput,
  ): Promise<{ success: boolean; ticketId: string }> {
    const mailQueue = MailQueueService.getInstance();
    const ticketId = `TKT-${randomUUID()}`;
    const mailFrom = Settings.getInstance().config.MAIL_FROM;

    await mailQueue.addBulk([
      {
        name: MAIL_ACTIONS.CONTACT_CONFIRMATION,
        data: {
          senderName: input.name,
          senderEmail: input.email,
          subject: input.subject,
          messageSnippet: input.message.substring(0, 100),
          ticketId,
          locale: input.locale,
        },
      },
      {
        name: MAIL_ACTIONS.CONTACT_FORM_ADMIN_ALERT,
        data: {
          senderName: input.name,
          senderEmail: input.email,
          subject: input.subject,
          fullMessage: input.message,
          adminEmail: mailFrom,
          locale: input.locale,
        },
      },
    ]);

    return { success: true, ticketId };
  }
}
