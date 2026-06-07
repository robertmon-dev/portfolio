import nodemailer, { SentMessageInfo } from "nodemailer";
import React from "react";
import { render } from "@react-email/render";
import { BaseService } from "../../services/service";
import { PrismaClient } from "@prisma/client";
import type { Logging } from "../../core/logger/types";
import type { Caching } from "../../infrastructure/cache/types";
import type { Settings } from "../../core/settings/settings";
import type { Mailing, MailSenderInput } from "./types";
import { WelcomeEmail } from "../../infrastructure/mailer/templates/Welcome";
import { ResetPasswordEmail } from "../../infrastructure/mailer/templates/ResetPassword";
import { TwoFactorEmail } from "../../infrastructure/mailer/templates/2FA";
import { ContactConfirmationEmail } from "../../infrastructure/mailer/templates/Contact";
import { AdminContactAlertEmail } from "./templates/AdminContactAlertEmail";
import type { Locale } from "@portfolio/shared";
import { MailOperation } from "./types";

export class MailSenderService
  extends BaseService<MailSenderInput, SentMessageInfo>
  implements Mailing
{
  private transporter: nodemailer.Transporter;

  constructor(
    db: PrismaClient,
    cache: Caching,
    logger: Logging,
    settings: Settings["config"],
  ) {
    super(db, cache, logger, settings, null);
    this.transporter = nodemailer.createTransport({
      host: this.settings.MAIL_HOST,
      port: this.settings.MAIL_PORT,
      secure: this.settings.MAIL_PORT === 465,
      auth: {
        user: this.settings.MAIL_USER,
        pass: this.settings.MAIL_PASS,
      },
    });
  }

  public async execute(input: MailSenderInput): Promise<SentMessageInfo> {
    switch (input.ops) {
      case MailOperation.WELCOME:
        return this.sendWelcomeEmail(
          input.to,
          input.name,
          input.url,
          input.locale,
        );

      case MailOperation.RESET_PASSWORD:
        return this.sendResetPassword(
          input.to,
          input.name,
          input.code,
          input.expiration,
          input.locale,
        );

      case MailOperation.TWO_FACTOR:
        return this.send2FACode(input.to, input.code, input.locale);

      case MailOperation.CONTACT_CONFIRMATION:
        return this.sendContactConfirmation(
          input.to,
          input.name,
          input.message,
          input.locale,
        );

      case MailOperation.ADMIN_CONTACT_ALERT:
        return this.sendAdminContactAlert(input.to, input.data);
    }
  }

  public async sendWelcomeEmail(
    to: string,
    name: string | null,
    url: string,
    locale: Locale,
  ) {
    const html = await render(
      React.createElement(WelcomeEmail, {
        name: name ?? "User",
        url,
        locale,
      }),
    );
    return this.send(to, "Welcome aboard! 🚀", html);
  }

  public async sendResetPassword(
    to: string,
    name: string | null,
    code: string,
    expiration: number,
    locale: Locale = "en",
  ) {
    const html = await render(
      React.createElement(ResetPasswordEmail, {
        name: name ?? "User",
        code,
        expiration,
        locale,
      }),
    );
    return this.send(to, "Reset your password 🔐", html);
  }

  public async send2FACode(to: string, code: string, locale: Locale = "en") {
    const html = await render(
      React.createElement(TwoFactorEmail, { code, locale }),
    );
    return this.send(to, "Your verification code ⚡", html);
  }

  public async sendContactConfirmation(
    to: string,
    name: string | null,
    message: string | null,
    locale: Locale = "en",
  ) {
    const subject =
      locale === "pl" ? "Wiadomość odebrana! 📥" : "Message received! 📥";

    const html = await render(
      React.createElement(ContactConfirmationEmail, {
        name: name ?? "User",
        message: message ?? "No message content",
        locale,
      }),
    );
    return this.send(to, subject, html);
  }

  public async sendAdminContactAlert(
    to: string,
    data: {
      senderName: string;
      senderEmail: string;
      subject: string;
      message: string;
      ip: string;
      locale: Locale;
    },
  ) {
    const html = await render(
      React.createElement(AdminContactAlertEmail, {
        senderName: data.senderName,
        senderEmail: data.senderEmail,
        subject: data.subject,
        message: data.message,
        ip: data.ip,
        locale: data.locale,
      }),
    );
    return this.send(
      to,
      `🔥 New contact from ${data.senderName}: ${data.subject}`,
      html,
    );
  }

  private async send(to: string, subject: string, html: string) {
    this.logger.info(`Email transmission started: [${subject}] to ${to}`);
    return await this.transporter.sendMail({
      from: `"Robert Moń" <${this.settings.MAIL_FROM}>`,
      to,
      subject,
      html,
    });
  }
}
