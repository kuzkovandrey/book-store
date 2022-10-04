import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';

import { AppRoutes } from '@core/values';
import { AuthService } from '@features/auth';

@Injectable({
  providedIn: 'root',
})
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
