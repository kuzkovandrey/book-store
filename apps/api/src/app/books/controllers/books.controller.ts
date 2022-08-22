import { Body, Controller, Post } from '@nestjs/common';

import { ApiControlles } from '@book-store/shared/values';
import { CreateBookDto } from '@book-store/shared/dto';
import { BooksService } from '@books/services/books.service';
import { BookEntity } from '@books/entities';
import { BaseController } from '@core/base';

@Controller(ApiControlles.BOOKS)
export class BooksController extends BaseController {
  constructor(private booksService: BooksService) {
    super(BooksController.name);
  }

  @Post(ApiControlles.CREATE)
  async createBook(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
    try {
      return await this.booksService.createBook(createBookDto);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }
}
