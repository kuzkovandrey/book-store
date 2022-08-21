import { Injectable } from '@angular/core';
import { CreateBookDto, Model, Book } from '@book-store/shared';
import { BookApi } from '@core/api/books.api';
import { Observable } from 'rxjs';

@Injectable()
export class BooksService {
  constructor(private bookApi: BookApi) {}

  createBook(book: CreateBookDto): Observable<Model<Book>> {
    return this.bookApi.createBook(book);
  }
}
