import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';

import { ProductModel } from '@book-store/shared/models';
import { AlertService, LoadingService } from '@core/services';
import { AppRoutes, CommonErrorMessages } from '@core/values';
import { SearchFilterItemOptions } from '@features/search';
import { SearchPageFacade } from './search-page.facade';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  resultList: ProductModel[];

  initialCategoryId: number | undefined;

  filterOptions: SearchFilterItemOptions[];

  constructor(
    private searchPageFacade: SearchPageFacade,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.initialCategoryId = (
      router.getCurrentNavigation()?.extras.state as { categoryId: number }
    )?.categoryId;

    if (this.initialCategoryId)
      this.searchPageFacade.setCategoryAsInitialFilterParams(
        this.initialCategoryId
      );
  }

  ngOnInit() {
    this.subscriptions.add(
      this.searchPageFacade.fetchFilterOptions().subscribe({
        next: this.setFilterOptions,
        error: this.handleFetchError,
      })
    );

    this.subscriptions.add(
      this.searchPageFacade.searchData$
        .pipe(tap(() => this.loadingService.setLoading(false)))
        .subscribe({
          next: this.setResultList,
          error: this.handleFetchError,
        })
    );

    this.subscriptions.add(
      this.searchPageFacade.searchBarValue$.subscribe((value) => {
        this.searchPageFacade.searchProducts(value);
      })
    );

    this.loadingService.setLoading(true);
    this.searchPageFacade.searchProducts();
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

  private setFilterOptions = (filterOptions: SearchFilterItemOptions[]) => {
    this.filterOptions = filterOptions;
  };

  private handleFetchError = () => {
    this.loadingService.setLoading(false);
    this.alertService.showError(CommonErrorMessages.UPLOAD_ERROR);
  };
}
