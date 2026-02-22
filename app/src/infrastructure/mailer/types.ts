export interface MailOptions {
  to: string;
  subject: string;
  templateId?: string;
  vars?: Record<string, any>;
  html?: string;
}

export interface Mailing {
  send(options: MailOptions): Promise<{ messageId: string; provider: string }>;
}
