import nodemailer from "nodemailer";
import React from "react";
import { render } from "@react-email/render";
import { BaseService } from "../../services/service";
import { PrismaClient } from "@prisma/client";
import type { Logging } from "../../core/logger/types";
import type { Caching } from "../../infrastructure/cache/types";
import type { Settings } from "../../core/settings/settings";
import type { Mailing } from "./types";
import { WelcomeEmail } from "../../infrastructure/mailer/templates/Welcome";
import { ResetPasswordEmail } from "../../infrastructure/mailer/templates/ResetPassword";
import { TwoFactorEmail } from "../../infrastructure/mailer/templates/2FA";
import { ContactConfirmationEmail } from "../../infrastructure/mailer/templates/Contact";
import { AdminContactAlertEmail } from "./templates/AdminContactAlertEmail";

export class MailSenderService extends BaseService implements Mailing {
  private transporter: nodemailer.Transporter;

  constructor(
    db: PrismaClient,
    cache: Caching,
    logger: Logging,
    settings: Settings["config"],
  ) {
    super(db, cache, logger, settings);

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

  public async sendWelcomeEmail(to: string, name: string | null, url: string) {
    const html = await render(
      React.createElement(WelcomeEmail, {
        name: name ?? "User",
        url,
      }),
    );
    return this.send(to, "Welcome aboard! 🚀", html);
  }

  public async sendResetPassword(to: string, name: string | null, url: string) {
    const html = await render(
      React.createElement(ResetPasswordEmail, {
        name: name ?? "User",
        url,
      }),
    );
    return this.send(to, "Reset your password 🔐", html);
  }

  public async send2FACode(to: string, code: string) {
    const html = await render(React.createElement(TwoFactorEmail, { code }));
    return this.send(to, "Your verification code ⚡", html);
  }

  public async sendContactConfirmation(
    to: string,
    name: string | null,
    message: string | null,
  ) {
    const html = await render(
      React.createElement(ContactConfirmationEmail, {
        name: name ?? "User",
        message: message ?? "No message content",
      }),
    );
    return this.send(to, "Message received! 📥", html);
  }

  public async sendAdminContactAlert(
    to: string,
    data: {
      senderName: string;
      senderEmail: string;
      subject: string;
      message: string;
      ip: string;
    },
  ) {
    const html = await render(
      React.createElement(AdminContactAlertEmail, {
        senderName: data.senderName,
        senderEmail: data.senderEmail,
        subject: data.subject,
        message: data.message,
        ip: data.ip,
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
