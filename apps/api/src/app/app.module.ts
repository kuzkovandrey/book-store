import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { BooksModule } from './books/books.module';
import { ProductsModule } from '@products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
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
      //dropSchema: true,
    }),
    ProductsModule,
    BooksModule,
  ],
})
export class AppModule {}
