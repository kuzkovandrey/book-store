import { ApiControlles } from '@book-store/shared/values';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  CreateBookDto,
  BookModel,
  AuthorModel,
  GenreModel,
  LanguageModel,
  PublisherModel,
} from '@book-store/shared';
import { Observable } from 'rxjs';

@Injectable()
export class BookApi {
  constructor(private http: HttpClient) {}

  createBook(book: CreateBookDto): Observable<BookModel> {
    return this.http.post<BookModel>(
      `${ApiControlles.BOOKS}${ApiControlles.CREATE}`,
      book
    );
  }

  changeBookValues(id: number, book: CreateBookDto): Observable<BookModel> {
    return this.http.patch<BookModel>(`${ApiControlles.BOOKS}/${id}`, book);
  }

  deleteBookById(id: number): Observable<BookModel> {
    return this.http.delete<BookModel>(`${ApiControlles.BOOKS}/${id}`);
  }

  getAllAuthors(): Observable<AuthorModel[]> {
    return this.http.get<AuthorModel[]>(
      `${ApiControlles.BOOKS}${ApiControlles.AUTHORS}`
    );
  }

  getAllGentes(): Observable<GenreModel[]> {
    return this.http.get<GenreModel[]>(
      `${ApiControlles.BOOKS}${ApiControlles.GENRES}`
    );
  }

  getAllLanguages(): Observable<LanguageModel[]> {
    return this.http.get<LanguageModel[]>(
      `${ApiControlles.BOOKS}${ApiControlles.LANGUAGES}`
    );
  }

  getAllPublishers(): Observable<PublisherModel[]> {
    return this.http.get<PublisherModel[]>(
      `${ApiControlles.BOOKS}${ApiControlles.PUBLISHERS}`
    );
  }
}
