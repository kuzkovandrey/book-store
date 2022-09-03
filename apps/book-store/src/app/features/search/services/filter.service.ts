import { FilterEntityNames } from '../values/filter-entity-names.enum';
import { forkJoin, map, Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { BooksService, CategoriesService } from '@core/services';
import { SearchFilterModel, ApiQueryParams, Model } from '@book-store/shared';
import {
  FilterEntities,
  FilterEntity,
  FilterEntityChangeEvent,
} from '../models';

export interface FilterEntityItem {
  hasItems: boolean;
  entities: FilterEntity[];
  name: FilterEntityNames;
}

@Injectable()
export class FilterService {
  private readonly filterParams = new BehaviorSubject<
    Partial<SearchFilterModel>
  >({});

  get filterParams$(): Observable<Partial<SearchFilterModel>> {
    return this.filterParams.asObservable();
  }

  private readonly filterEntityNames = [
    FilterEntityNames.AUTHOR,
    FilterEntityNames.GENRE,
    FilterEntityNames.LANGUAGE,
    FilterEntityNames.PUBLISHER,
    FilterEntityNames.CATEGORY,
  ];

  private readonly filterNamesToQuery = {
    [FilterEntityNames.AUTHOR]: ApiQueryParams.AUTHORS,
    [FilterEntityNames.GENRE]: ApiQueryParams.GENRES,
    [FilterEntityNames.LANGUAGE]: ApiQueryParams.LANGS,
    [FilterEntityNames.PUBLISHER]: ApiQueryParams.PUBLISHER,
    [FilterEntityNames.CATEGORY]: ApiQueryParams.CATEGORIES,
  };

  constructor(
    private booksService: BooksService,
    private categoriesService: CategoriesService
  ) {
    this.filterParams$.subscribe((v) => console.log(v));
  }

  getFilterEntities(): Observable<FilterEntityItem[]> {
    return forkJoin([
      this.booksService.getAllAuthors(),
      this.booksService.getAllGentes(),
      this.booksService.getAllLanguages(),
      this.booksService.getAllPublishers(),
      this.categoriesService.getAll(),
    ]).pipe(
      map((entityArray) =>
        entityArray.map((entities, index) => ({
          hasItems: !!entities.length,
          name: this.filterEntityNames[index],
          entities,
        }))
      )
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
