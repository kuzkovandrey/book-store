import { LoadingService, AlertService } from '@core/services';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutes, CommonErrorMessages } from '@core/values';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  private handleUnauthorizedError() {
    this.router.navigate([AppRoutes.AUTH]);
    this.loadingService.setLoading(false);
    this.alertService.showError(CommonErrorMessages.UNAUTHORIZED);
    return of();
  }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Forbidden)
          this.handleUnauthorizedError();

        return throwError(() => error);
      })
    );
  }
}
