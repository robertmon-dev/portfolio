import type { SentMessageInfo } from "nodemailer";

export interface MailOptions {
  to: string;
  subject: string;
  templateId?: string;
  vars?: Record<string, any>;
  html?: string;
}

export interface Mailing {
  sendWelcomeEmail(
    to: string,
    name: string | null,
    url: string,
  ): Promise<SentMessageInfo>;
  sendResetPassword(
    to: string,
    name: string | null,
    url: string,
  ): Promise<SentMessageInfo>;
  send2FACode(to: string, code: string): Promise<SentMessageInfo>;
  sendContactConfirmation(
    to: string,
    name: string | null,
    message: string,
  ): Promise<SentMessageInfo>;
}
