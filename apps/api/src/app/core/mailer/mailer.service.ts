import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';

export interface MailOptions {
  text: string;
  subject: string;
  to: string;
}

@Injectable()
export class MailerService {
  constructor(@Inject('MAIL_TRANSPORTER') private transporter: Transporter) {}

  async sendEmail({ text, subject, to }: MailOptions) {
    try {
      await this.transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to,
        text,
        subject,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
