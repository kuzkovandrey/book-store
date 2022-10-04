import { ApiGateway } from '@core/api/api.gateway';
import { ApiControlles } from '@book-store/shared/values';
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

@Injectable({
  providedIn: 'root',
})
export class BookApi {
  constructor(private api: ApiGateway) {}

  createBook(body: CreateBookDto): Observable<BookModel> {
    return this.api.post<BookModel>({
      url: `${ApiControlles.BOOKS}${ApiControlles.CREATE}`,
      body,
    });
  }

  changeBookValues(id: number, body: CreateBookDto): Observable<BookModel> {
    return this.api.patch<BookModel>({
      url: `${ApiControlles.BOOKS}/${id}`,
      body,
    });
  }

  deleteBookById(id: number): Observable<BookModel> {
    return this.api.delete<BookModel>({
      url: `${ApiControlles.BOOKS}/${id}`,
    });
  }

  getAllAuthors(): Observable<AuthorModel[]> {
    return this.api.get<AuthorModel[]>({
      url: `${ApiControlles.BOOKS}${ApiControlles.AUTHORS}`,
    });
  }

  getAllGentes(): Observable<GenreModel[]> {
    return this.api.get<GenreModel[]>({
      url: `${ApiControlles.BOOKS}${ApiControlles.GENRES}`,
    });
  }

  getAllLanguages(): Observable<LanguageModel[]> {
    return this.api.get<LanguageModel[]>({
      url: `${ApiControlles.BOOKS}${ApiControlles.LANGUAGES}`,
    });
  }

  getAllPublishers(): Observable<PublisherModel[]> {
    return this.api.get<PublisherModel[]>({
      url: `${ApiControlles.BOOKS}${ApiControlles.PUBLISHERS}`,
    });
  }
}
