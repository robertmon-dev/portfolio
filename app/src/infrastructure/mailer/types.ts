import type { SentMessageInfo } from "nodemailer";
import type { Locale } from "@portfolio/shared";

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

export enum MailOperation {
  WELCOME,
  RESET_PASSWORD,
  TWO_FACTOR,
  CONTACT_CONFIRMATION,
  ADMIN_CONTACT_ALERT,
}

export type MailSenderInput =
  | {
      ops: MailOperation.WELCOME;
      to: string;
      name: string | null;
      url: string;
      locale: Locale;
    }
  | {
      ops: MailOperation.RESET_PASSWORD;
      to: string;
      name: string | null;
      code: string;
      expiration: number;
      locale?: Locale;
    }
  | { ops: MailOperation.TWO_FACTOR; to: string; code: string; locale?: Locale }
  | {
      ops: MailOperation.CONTACT_CONFIRMATION;
      to: string;
      name: string | null;
      message: string | null;
      locale?: Locale;
    }
  | {
      ops: MailOperation.ADMIN_CONTACT_ALERT;
      to: string;
      data: AdminContactAlertProps;
    };
