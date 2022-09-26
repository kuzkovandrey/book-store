import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { AuthService } from '@core/services';
import { AppRoutes } from '@core/values';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthorized()) return true;

    this.router.navigate([AppRoutes.AUTH]);

    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
