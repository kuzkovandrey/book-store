import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsRelations, Repository } from 'typeorm';

import { AuthorsService } from '@books/services/authors.service';
import { LanguagesService } from '@books/services/languages.service';
import { PublishersService } from '@books/services/publishers.service';
import { GenresService } from '@books/services/genres.service';
import { BookEntity } from '@books/entities';
import { CreateBookDto } from '@book-store/shared/dto';

@Injectable()
export class BooksService {
  private readonly findOptionsRelations: FindOptionsRelations<BookEntity> = {
    language: true,
    publisher: true,
    genre: true,
    authors: true,
  } as const;

  constructor(
    @InjectRepository(BookEntity)
    private repository: Repository<BookEntity>,
    private genresService: GenresService,
    private authorsService: AuthorsService,
    private languagesService: LanguagesService,
    private publishersService: PublishersService
  ) {}

  findAll(): Promise<BookEntity[]> {
    return this.repository.find({
      relations: this.findOptionsRelations,
    });
  }

  findById(id: number): Promise<BookEntity> {
    return this.repository.findOneBy({ id });
  }

  async create(bookDto: CreateBookDto): Promise<BookEntity> {
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

    return this.repository
      .create({
        genre,
        language,
        authors: [...authors],
        publisher,
        title: bookDto.title,
        description: bookDto.description,
        pageCount: bookDto.pageCount,
        publicationYear: bookDto.publicationYear,
        picture: bookDto.picture,
      } as DeepPartial<BookEntity>)
      .save();
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
