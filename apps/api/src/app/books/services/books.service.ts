import { ProductsService } from '@products/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsRelations, Repository } from 'typeorm';

import { AuthorsService } from '@books/services/authors.service';
import { LanguagesService } from '@books/services/languages.service';
import { PublishersService } from '@books/services/publishers.service';
import { GenresService } from '@books/services/genres.service';
import { BookEntity } from '@books/entities';
import { CreateBookDto } from '@book-store/shared/dto';
import { BaseService } from '@core/base';

@Injectable()
export class BooksService extends BaseService<BookEntity> {
  private readonly findOptionsRelations: FindOptionsRelations<BookEntity> = {
    language: true,
    publisher: true,
    genre: true,
    authors: true,
  } as const;

  constructor(
    @InjectRepository(BookEntity)
    repository: Repository<BookEntity>,
    private genresService: GenresService,
    private authorsService: AuthorsService,
    private languagesService: LanguagesService,
    private publishersService: PublishersService,
    private productsService: ProductsService
  ) {
    super(BookEntity.name, repository);
  }

  async createBook(bookDto: CreateBookDto): Promise<BookEntity> {
    const genre = await this.genresService.createIfNotExists(bookDto.genreName);

    const language = await this.languagesService.createIfNotExists(
      bookDto.language.code,
      bookDto.language.name
    );

    const authorsPromises = bookDto.authors.map(
      async ({ firstName, lastName }) => {
        return this.authorsService.createIfNotExists(firstName, lastName);
      }
    );

    const authors = await Promise.all(authorsPromises);

    const publisher = await this.publishersService.createIfNotExists(
      bookDto.publisherName
    );

    return this.executeElseThrowIncorrectDataError(async () => {
      const entity = await this.create({
        genre,
        language,
        authors: [...authors],
        publisher,
        title: bookDto.title,
        description: bookDto.description,
        pageCount: bookDto.pageCount,
        publicationYear: bookDto.publicationYear,
        picture: bookDto.picture,
      } as DeepPartial<BookEntity>);

      return await entity.save();
    });
  }
}
