import { registerAs } from '@nestjs/config';

export default registerAs('adminCredential', () => ({
  login: process.env.ADMIN_LOGIN,
  password: process.env.ADMIN_PASSWORD,
}));
