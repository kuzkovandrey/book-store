import { Controller, Get } from '@nestjs/common';

import { ApiControlles } from '@book-store/shared/values';
import { AuthorsService, GenresService } from '@books/services';
import { GenreEntity, AuthorEntity } from '@books/entities';
import { BaseController } from '@core/base';

@Controller(ApiControlles.BOOKS)
export class BooksParamsController extends BaseController {
  constructor(
    private authorsService: AuthorsService,
    private genresService: GenresService
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
}
