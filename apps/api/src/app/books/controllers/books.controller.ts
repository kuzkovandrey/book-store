import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiControlles } from '@book-store/shared/values';
import { CreateBookDto } from '@book-store/shared/dto';
import { BooksService } from '@books/services/books.service';
import { BookEntity } from '@books/entities';
import { BaseController } from '@core/base';
import { AuthenticatedGuard } from '@auth';

@Controller(ApiControlles.BOOKS)
@UseGuards(AuthenticatedGuard)
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

  @Patch('/:id')
  async changeBookValues(
    @Param('id') id: number,
    @Body() createBookDto: CreateBookDto
  ): Promise<BookEntity> {
    try {
      return await this.booksService.changeBookValues(id, createBookDto);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: number) {
    try {
      return await this.booksService.deleteById(id);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }
}
