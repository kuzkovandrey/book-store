import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';

import { AlertService, LoadingService } from '@core/services';
import { AppRoutes, CommonErrorMessages } from '@core/values';
import { MainPageFacade } from './services';
import { ProductCategorySection } from './types';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  sections: ProductCategorySection[];

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private mainPageFacade: MainPageFacade
  ) {}

  ngOnInit() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.mainPageFacade
        .getCategorySections()
        .pipe(tap(() => this.loadingService.setLoading(false)))
        .subscribe({
          next: this.setSections,
          error: this.handleError,
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private setSections = (sections: ProductCategorySection[]) => {
    this.sections = sections;
  };

  private handleError = ({ status }: HttpErrorResponse) => {
    this.loadingService.setLoading(false);
    this.alertService.showError(
      `${CommonErrorMessages.UNKNOWN}, статус: ${status}`
    );
  };

  navigateToSearchPage(categoryId?: number) {
    this.router.navigate([AppRoutes.SEARCH], {
      state: {
        categoryId,
      },
    });
  }

  navigateToProductPage(id: number) {
    this.router.navigate([AppRoutes.PRODUCT, id]);
  }
}
