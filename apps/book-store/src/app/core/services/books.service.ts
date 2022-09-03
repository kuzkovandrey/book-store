import { Injectable } from '@angular/core';
import {
  CreateBookDto,
  BookModel,
  AuthorModel,
  GenreModel,
  LanguageModel,
  PublisherModel,
} from '@book-store/shared';
import { BookApi } from '@core/api/books.api';
import { Observable } from 'rxjs';

@Injectable()
export class BooksService {
  constructor(private bookApi: BookApi) {}

  createBook(book: CreateBookDto): Observable<BookModel> {
    return this.bookApi.createBook(book);
  }

  getAllAuthors(): Observable<AuthorModel[]> {
    return this.bookApi.getAllAuthors();
  }

  getAllGentes(): Observable<GenreModel[]> {
    return this.bookApi.getAllGentes();
  }

  getAllLanguages(): Observable<LanguageModel[]> {
    return this.bookApi.getAllLanguages();
  }

  getAllPublishers(): Observable<PublisherModel[]> {
    return this.bookApi.getAllPublishers();
  }
}
