import { Router } from '@angular/router';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, tap } from 'rxjs';

import { AppRoutes, CommonErrorMessages } from '@core/values';
import { AlertService, LoadingService } from '@core/services';
import { AuthService } from '@features/auth';
import { User } from '@book-store/shared';

@Component({
  selector: 'auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnDestroy {
  private readonly subscriptions = new Subscription();

  user: User;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private handleSuccess = () => {
    this.router.navigate([AppRoutes.ADMIN]);
  };

  private handleError = ({ status }: HttpErrorResponse) => {
    this.loadingService.setLoading(false);

    if (status === HttpStatusCode.Unauthorized) {
      this.alertService.showError(CommonErrorMessages.INCORRENT_VALUES);
      return;
    }

    this.alertService.showError(CommonErrorMessages.UNKNOWN);
  };

  onFormValueChanges(user: User) {
    this.user = user;
  }

  login() {
    this.subscriptions.add(
      this.authService
        .login(this.user)
        .pipe(tap(() => this.loadingService.setLoading(false)))
        .subscribe({
          next: this.handleSuccess,
          error: this.handleError,
        })
    );
  }
}
