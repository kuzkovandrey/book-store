import { ApiControlles } from '@book-store/shared/values';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CreateBookDto, Model, Book } from '@book-store/shared';
import { Observable } from 'rxjs';

@Injectable()
export class BookApi {
  constructor(private http: HttpClient) {}

  createBook(book: CreateBookDto): Observable<Model<Book>> {
    return this.http.post<Model<Book>>(
      `${ApiControlles.BOOKS}${ApiControlles.CREATE}`,
      book
    );
  }
}
