import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AuthorEntity,
  GenreEntity,
  LanguageEntity,
  BookEntity,
  PublisherEntity,
} from '@books/entities';
import {
  LanguagesService,
  BooksService,
  GenresService,
  PublishersService,
  AuthorsService,
} from '@books/services';
import { BooksController } from './controllers/books.controller';
import { BooksSubscriber } from './subscribers/books.subscriber';
import { ProductsModule } from '@products/products.module';
import { BooksParamsController } from './controllers/book-params.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthorEntity,
      GenreEntity,
      LanguageEntity,
      BookEntity,
      PublisherEntity,
    ]),
    ProductsModule,
  ],
  providers: [
    GenresService,
    LanguagesService,
    PublishersService,
    AuthorsService,
    BooksService,
    BooksSubscriber,
  ],
  controllers: [BooksController, BooksParamsController],
})
export class BooksModule {}
