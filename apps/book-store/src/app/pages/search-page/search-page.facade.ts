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
  tap,
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
import { LoadingService } from '@core/services';

@Injectable()
export class SearchPageFacade {
  private readonly SEARCH_DEBOUNCE = 300;

  get searchData$(): Observable<ProductModel[]> {
    return this.search$.pipe(
      debounceTime(this.SEARCH_DEBOUNCE),
      switchMap((text) =>
        combineLatest([of(text), this.searchFilterService.filterParams$])
      ),
      tap(this.setLoading),
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
    private readonly searchBarService: SearchBarService,
    private readonly loadingService: LoadingService
  ) {}

  private setLoading = () => {
    this.loadingService.setLoading(true);
  };

  setCategoryAsInitialFilterParams(id: number) {
    this.searchFilterService.appendFilterParams({
      [ApiQueryParams.CATEGORIES]: [id],
    });
  }

  resetFilterParams() {
    this.searchFilterService.resetFilterParams();
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
