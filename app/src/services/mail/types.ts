import type { User } from '@prisma/client';

export type MailUser = Omit<User, 'passwordDigest' | 'createdAt' | 'updatedAt'>;

interface WelcomeEmailData {
  user: MailUser;
  verificationUrl: string;
}

interface PasswordResetData {
  user: MailUser;
  resetToken: string;
  expiryMinutes: number;
}

interface MarketingEmailData {
  user: MailUser;
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
  WELCOME_EMAIL: WelcomeEmailData;
  PASSWORD_RESET: PasswordResetData;
  MARKETING_AD: MarketingEmailData;
  CONTACT_FORM_CONFIRMATION: ContactFormConfirmationData;
}

export type MailSend = keyof MailActionMap;
export type MailSendJob = MailActionMap[MailSend];

export type MailSendResult =
  | { success: true; messageId: string; sentAt: Date; provider: string }
  | { success: false; error: string; attemptedAt: Date };

export type MailJobUnion = {
  [K in MailSend]: { name: K; data: MailActionMap[K] }
}[MailSend];
