import { BooksService } from '@books/services/books.service';
import { CreateBookDto } from '@book-store/models/dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookEntity } from '@books/entities';

@Controller('/books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post('/create')
  createBook(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
    return this.booksService.create(createBookDto);
  }

  @Get('/')
  test() {
    return 'test';
  }
}
