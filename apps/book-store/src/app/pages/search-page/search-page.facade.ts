import { Injectable } from '@angular/core';
import {
  combineLatest,
  debounceTime,
  forkJoin,
  map,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';

import { BooksService } from '@features/book';
import { ProductCategoriesService, ProductsService } from '@features/product';

import {
  SearchFilterService,
  SearchBarService,
  SearchFilterItemOptions,
  SearchFilterEntityNameList,
} from '@features/search';
import { ProductModel } from '@book-store/shared/models';
import { ApiQueryParams } from '@book-store/shared/values';

@Injectable()
export class SearchPageFacade {
  private readonly SEARCH_DEBOUNCE = 300;

  private readonly searchData = new Subject<ProductModel[]>();

  get searchData$(): Observable<ProductModel[]> {
    return this.search$.pipe(
      debounceTime(this.SEARCH_DEBOUNCE),
      switchMap((text) =>
        combineLatest([of(text), this.searchFilterService.filterParams$])
      ),
      switchMap(([text, filters]) =>
        this.productsService.search({
          text,
          filters,
        })
      )
    );
  }

  get searchBarValue$(): Observable<string> {
    return this.searchBarService.searchValue$.pipe(
      debounceTime(this.SEARCH_DEBOUNCE)
    );
  }

  private readonly search$ = new Subject<string>();

  constructor(
    private readonly booksService: BooksService,
    private readonly productsService: ProductsService,
    private readonly categoriesService: ProductCategoriesService,
    private readonly searchFilterService: SearchFilterService,
    private readonly searchBarService: SearchBarService
  ) {}

  setCategoryAsInitialFilterParams(id: number) {
    this.searchFilterService.appendFilterParams({
      [ApiQueryParams.CATEGORIES]: [id],
    });
  }

  fetchFilterOptions(): Observable<SearchFilterItemOptions[]> {
    return forkJoin([
      this.booksService.getAllAuthors(),
      this.booksService.getAllGentes(),
      this.booksService.getAllLanguages(),
      this.booksService.getAllPublishers(),
      this.categoriesService.getAll(),
    ]).pipe(
      map((entityArray) => {
        return entityArray.map((entities, index) => ({
          hasItems: !!entities.length,
          name: SearchFilterEntityNameList[index],
          entities,
        }));
      })
    );
  }

  searchProducts(values?: string) {
    this.search$.next(values ?? '');
  }
}
