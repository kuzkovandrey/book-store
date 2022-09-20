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
    private publishersService: PublishersService
  ) {
    super(BookEntity.name, repository);
  }

  async createBook(bookDto: CreateBookDto): Promise<BookEntity> {
    const book = await this.createFromDto(bookDto);

    return await book.save();
  }

  async changeBookValues(
    id: number,
    bookDto: CreateBookDto
  ): Promise<BookEntity> {
    const book = await this.findOneBy({ id }, this.findOptionsRelations);
    const {
      description,
      authors,
      language,
      pageCount,
      publisher,
      publicationYear,
      picture,
      genre,
      title,
    } = await this.createFromDto(bookDto);

    return this.executeElseThrowIncorrectDataError(async () => {
      book.description = description;
      book.authors = authors;
      book.language = language;
      book.pageCount = pageCount;
      book.publisher = publisher;
      book.publicationYear = publicationYear;
      book.picture = picture;
      book.genre = genre;
      book.title = title;

      return await book.save();
    });
  }

  private async createFromDto(bookDto: CreateBookDto): Promise<BookEntity> {
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
      return await this.create({
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
    });
  }
}
