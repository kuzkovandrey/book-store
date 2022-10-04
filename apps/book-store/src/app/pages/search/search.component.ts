import { CommonErrorMessages } from '@core/values/common-error-messages.enum';
import { FilterService } from 'src/app/pages/search/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, switchMap, tap } from 'rxjs';
import { SearchBarService } from './services/search-bar.service';
import { AlertService, LoadingService } from '@core/services';
import { ProductModel, SearchFilterModel } from '@book-store/shared/models';
import { Router } from '@angular/router';
import { ApiQueryParams } from '@book-store/shared/values';
import { AppRoutes } from '@core/values';

import { ProductsService } from '@features/product';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private filterParams: Partial<SearchFilterModel> = {};

  resultList: ProductModel[];

  initialCategoryId: number | undefined;

  constructor(
    private searchBarService: SearchBarService,
    private productsService: ProductsService,
    private filterService: FilterService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.initialCategoryId = (
      router.getCurrentNavigation()?.extras.state as { categoryId: number }
    )?.categoryId;
  }

  ngOnInit() {
    this.subscriptions.add(
      this.productsService
        .search({
          pageOptions: { page: 1, perPage: 25 },
          filters: this.getInitialSearchFilters(),
        })
        .subscribe({
          next: this.setResultList,
          error: this.handleFetchError,
        })
    );

    this.subscriptions.add(
      this.searchBarService.search$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap((text) =>
            this.productsService.search({
              text,
              filters: this.filterParams,
            })
          ),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.setResultList,
          error: this.handleFetchError,
        })
    );

    this.subscriptions.add(
      this.filterService.filterParams$.subscribe((filterParams) => {
        this.filterParams = filterParams;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  navigateToProductPage(id: number) {
    this.router.navigate([AppRoutes.PRODUCT, id]);
  }

  private setResultList = (resultList: ProductModel[]) => {
    this.resultList = resultList;
  };

  private getInitialSearchFilters(): Partial<SearchFilterModel> {
    return {
      ...(this.initialCategoryId
        ? {
            [ApiQueryParams.CATEGORIES]: [this.initialCategoryId],
          }
        : {}),
    };
  }

  private handleFetchError = () => {
    this.loadingService.setLoading(false);

    this.alertService.showError(CommonErrorMessages.UPLOAD_ERROR);
  };
}
