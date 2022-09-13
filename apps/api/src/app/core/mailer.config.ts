import { registerAs } from '@nestjs/config';

export default registerAs('mailer', () => ({
  adminEmail: process.env.ADMIN_EMAIL,
  adminEmailPassword: process.env.ADMIN_EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_HOST_PORT, 10),
}));
