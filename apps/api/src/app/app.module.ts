import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { BooksModule } from './books/books.module';
import { ProductsModule } from '@products/products.module';
import { OrdersModule } from '@orders/orders.module';
import { MainModule } from './main/main.module';
import { MailerModule } from './core/mailer/mailer.module';
import mailerConfig from '@core/mailer.config';
import databaseConfig from '@core/database.config';
import adminCredentialConfig from '@core/admin-credential.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, mailerConfig, adminCredentialConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER_NAME,
      password: process.env.DATABASE_USER_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      autoLoadEntities: true,
      // dropSchema: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    BooksModule,
    OrdersModule,
    MainModule,
    MailerModule,
  ],
})
export class AppModule {}
