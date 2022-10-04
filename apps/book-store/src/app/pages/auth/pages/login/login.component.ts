import { AppRoutes, CommonErrorMessages } from '@core/values';
import { LoadingService } from '@core/services/loading.service';
import { AlertService } from '@core/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, switchMap, tap } from 'rxjs';
import { User } from '@book-store/shared';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AuthService } from '@features/auth';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private readonly login$ = new Subject<User>();

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.login$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap((user) => this.authService.login(user)),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.handleSuccess,
          error: this.handleError,
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private handleSuccess = () => {
    this.router.navigate([AppRoutes.ADMIN]);
  };

  private handleError = ({ status }: HttpErrorResponse) => {
    this.loadingService.setLoading(false);

    console.log(status);

    if (status === HttpStatusCode.Unauthorized) {
      this.alertService.showError(CommonErrorMessages.INCORRENT_VALUES);
      return;
    }

    this.alertService.showError(CommonErrorMessages.UNKNOWN);
  };

  onClickLoginButton() {
    console.log(this.loginForm.value);

    this.login$.next(this.loginForm.value as User);
  }
}
