import { ApiControlles } from '@book-store/shared/values';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  CreateBookDto,
  BookModel,
  AuthorModel,
  GenreModel,
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
}
