import { Global, Module } from '@nestjs/common';
import { createTransport } from 'nodemailer';

import { MailService } from './mail.service';

@Global()
@Module({
  providers: [
    {
      provide: 'MAIL_TRANSPORTER',
      useFactory: () => {
        console.log(process.env.ADMIN_EMAIL, process.env.ADMIN_EMAIL_PASSWORD);

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
    MailService,
  ],
  exports: [MailService],
})
export class MailModule {}
