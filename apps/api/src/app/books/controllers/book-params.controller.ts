import { Controller, Get } from '@nestjs/common';

import { ApiControlles } from '@book-store/shared/values';
import {
  AuthorsService,
  GenresService,
  LanguagesService,
  PublishersService,
} from '@books/services';
import {
  GenreEntity,
  AuthorEntity,
  LanguageEntity,
  PublisherEntity,
} from '@books/entities';
import { BaseController } from '@core/base';

@Controller(ApiControlles.BOOKS)
export class BooksParamsController extends BaseController {
  constructor(
    private authorsService: AuthorsService,
    private genresService: GenresService,
    private languagesService: LanguagesService,
    private publishersService: PublishersService
  ) {
    super(BooksParamsController.name);
  }

  @Get(ApiControlles.AUTHORS)
  getAllAuthors(): Promise<AuthorEntity[]> {
    return this.authorsService.findAll();
  }

  @Get(ApiControlles.GENRES)
  getAllGenres(): Promise<GenreEntity[]> {
    return this.genresService.findAll();
  }

  @Get(ApiControlles.LANGUAGES)
  getAllLanguages(): Promise<LanguageEntity[]> {
    return this.languagesService.findAll();
  }

  @Get(ApiControlles.PUBLISHERS)
  getAllPublishers(): Promise<PublisherEntity[]> {
    return this.publishersService.findAll();
  }
}
