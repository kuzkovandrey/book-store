import { Body, Controller, Post } from '@nestjs/common';

import { ApiControlles } from '@book-store/shared/values';
import { CreateBookDto } from '@book-store/shared/dto';
import { BooksService } from '@books/services/books.service';
import { BookEntity } from '@books/entities';

@Controller(ApiControlles.BOOKS)
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post(ApiControlles.CREATE)
  createBook(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
    return this.booksService.create(createBookDto);
  }
}
