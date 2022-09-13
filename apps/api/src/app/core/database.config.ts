import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  userName: process.env.DATABASE_USER_NAME,
  userPassword: process.env.DATABASE_USER_PASSWORD,
  name: process.env.DATABASE_NAME,
  databaseType: process.env.DATABASE_TYPE,
}));
