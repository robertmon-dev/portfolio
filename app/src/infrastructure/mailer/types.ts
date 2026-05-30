import type { SentMessageInfo } from "nodemailer";

export type Locale = "pl" | "en";

export type MailValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | MailValue[];

export interface MailOptions {
  to: string;
  subject: string;
  templateId?: string;
  vars?: Record<string, MailValue>;
  html?: string;
}

export interface AdminContactAlertProps {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  ip: string;
  locale: Locale;
}

export interface VerificationAlertProps {
  code: string;
  locale: Locale;
}

export interface ResetAlertProps {
  name: string;
  code: string;
  expiration: number;
  locale: Locale;
}

export interface WelcomeEmailProps {
  name: string;
  url: string;
  locale: Locale;
}

export interface Mailing {
  sendWelcomeEmail(
    to: string,
    name: string | null,
    url: string,
    locale: Locale,
  ): Promise<SentMessageInfo>;
  sendResetPassword(
    to: string,
    name: string | null,
    code: string,
    expiration: number,
    locale: Locale,
  ): Promise<SentMessageInfo>;
  send2FACode(
    to: string,
    code: string,
    locale: Locale,
  ): Promise<SentMessageInfo>;
  sendContactConfirmation(
    to: string,
    name: string | null,
    message: string,
    locale: Locale,
  ): Promise<SentMessageInfo>;
  sendAdminContactAlert(
    to: string,
    data: {
      senderName: string;
      senderEmail: string;
      subject: string;
      message: string;
      ip: string;
      locale: Locale;
    },
  ): Promise<SentMessageInfo>;
}
