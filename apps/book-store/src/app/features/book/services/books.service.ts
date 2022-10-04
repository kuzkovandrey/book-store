import { Injectable } from '@angular/core';
import {
  CreateBookDto,
  BookModel,
  AuthorModel,
  GenreModel,
  LanguageModel,
  PublisherModel,
} from '@book-store/shared';
import { BookApi } from '@features/book/api/books.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private bookApi: BookApi) {}

  createBook(book: CreateBookDto): Observable<BookModel> {
    return this.bookApi.createBook(book);
  }

  changeBookValues(id: number, book: CreateBookDto): Observable<BookModel> {
    return this.bookApi.changeBookValues(id, book);
  }

  deleteBookById(id: number): Observable<BookModel> {
    return this.bookApi.deleteBookById(id);
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
