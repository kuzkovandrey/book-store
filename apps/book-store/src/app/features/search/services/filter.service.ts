import { FilterEntityNames } from '../values/filter-entity-names.enum';
import { forkJoin, map, Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { BooksService } from '@core/services';
import { SearchFilterModel, ApiQueryParams, Model } from '@book-store/shared';
import { FilterEntities, FilterEntityChangeEvent } from '../models';

@Injectable()
export class FilterService {
  private readonly filterParams = new BehaviorSubject<
    Partial<SearchFilterModel>
  >({});

  get filterParams$(): Observable<Partial<SearchFilterModel>> {
    return this.filterParams.asObservable();
  }

  private readonly filterNamesToQuery = {
    [FilterEntityNames.AUTHOR]: ApiQueryParams.AUTHORS,
    [FilterEntityNames.GENRE]: ApiQueryParams.GENRES,
    [FilterEntityNames.LANGUAGE]: ApiQueryParams.LANGS,
    [FilterEntityNames.PUBLISHER]: ApiQueryParams.PUBLISHER,
  };

  constructor(private booksService: BooksService) {
    this.filterParams$.subscribe((v) => console.log(v));
  }

  getFilterEntities(): Observable<FilterEntities> {
    return forkJoin([
      this.booksService.getAllAuthors(),
      this.booksService.getAllGentes(),
      this.booksService.getAllLanguages(),
      this.booksService.getAllPublishers(),
    ]).pipe(
      map(([authors, genres, languages, publishers]) => ({
        authors,
        genres,
        languages,
        publishers,
      }))
    );
  }

  private getIdArray(models: Model<unknown>[]) {
    return models.map(({ id }) => id);
  }

  handleFilterChanges({ name, values }: FilterEntityChangeEvent) {
    const queryName = this.filterNamesToQuery[name];

    if (!queryName) throw new Error('handleFilterChanges');

    this.filterParams.next({
      ...this.filterParams.value,
      [queryName]: this.getIdArray(values),
    });
  }
}
