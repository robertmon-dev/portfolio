import { BulkJobOptions, Job } from "bullmq";
import type { User } from '@prisma/client';

export const MAIL_ACTIONS = {
  WELCOME: 'WELCOME_EMAIL',
  PASSWORD_RESET: 'PASSWORD_RESET',
  MARKETING: 'MARKETING_AD',
  CONTACT_CONFIRMATION: 'CONTACT_FORM_CONFIRMATION',
  TWO_FACTOR_CODE: 'TWO_FACTOR_CODE',
} as const;

export type MailActionName = typeof MAIL_ACTIONS[keyof typeof MAIL_ACTIONS];

interface TwoFactorEmailData {
  user: User;
  code: string;
}

interface WelcomeEmailData {
  user: User;
  verificationUrl: string;
}

interface PasswordResetData {
  user: User;
  resetToken: string;
  expiryMinutes: number;
}

interface MarketingEmailData {
  user: User;
  campaignName: string;
  offerTitle: string;
  discountCode?: string;
  ctaUrl: string;
}

interface ContactFormConfirmationData {
  senderName: string;
  senderEmail: string;
  subject: string;
  messageSnippet: string;
  ticketId: string;
}

export interface MailActionMap {
  [MAIL_ACTIONS.WELCOME]: WelcomeEmailData;
  [MAIL_ACTIONS.PASSWORD_RESET]: PasswordResetData;
  [MAIL_ACTIONS.MARKETING]: MarketingEmailData;
  [MAIL_ACTIONS.CONTACT_CONFIRMATION]: ContactFormConfirmationData;
  [MAIL_ACTIONS.TWO_FACTOR_CODE]: TwoFactorEmailData;
}

export type MailSend = keyof MailActionMap;
export type MailSendJob = MailActionMap[MailSend];

export type MailSendResult =
  | { success: true; messageId: string; sentAt: Date; provider: string }
  | { success: false; error: string; attemptedAt: Date };

export type MailJobUnion = {
  [K in MailSend]: { name: K; data: MailActionMap[K] }
}[MailSend];

export interface Queueing<TData, TResult, TName extends string> {
  addJob(name: TName, data: TData, opts?: BulkJobOptions): Promise<Job<TData, TResult, TName>>;
  addBulk(jobs: { name: TName; data: TData; opts?: BulkJobOptions }[]): Promise<Job<TData, TResult, TName>[]>;
}
