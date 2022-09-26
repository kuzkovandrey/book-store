import { HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from '@core/services/loading.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';

import { MainPageSection } from '@book-store/shared';
import { MainService } from '@features/main/services/main.service';
import { AppRoutes, CommonErrorMessages } from '@core/values';
import { AlertService } from '@core/services';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  sections: MainPageSection[] = [];

  skeletonSections = new Array(3);

  constructor(
    private mainService: MainService,
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.mainService
        .getMainPageSecrions()
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

  private setSections = (sections: MainPageSection[]) => {
    this.sections = sections;
  };

  private handleError = ({ status }: HttpErrorResponse) => {
    this.loadingService.setLoading(false);
    this.alertService.showError(
      `${CommonErrorMessages.UNKNOWN}, статус: ${status}`
    );
  };

  navigateToSearchPage() {
    this.router.navigate([AppRoutes.SEARCH]);
  }
}
