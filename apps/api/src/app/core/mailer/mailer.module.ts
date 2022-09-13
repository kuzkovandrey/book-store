import { Global, Module } from '@nestjs/common';
import { createTransport } from 'nodemailer';

import { MailerService } from './mailer.service';

@Global()
@Module({
  providers: [
    {
      provide: 'MAIL_TRANSPORTER',
      useFactory: () => {
        return createTransport({
          host: 'smtp.mail.ru',
          name: 'Nodemailer',
          port: 465,
          secure: true,
          auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASSWORD,
          },
        });
      },
    },
    MailerService,
  ],
  exports: [MailerService],
})
export class MailerModule {}
