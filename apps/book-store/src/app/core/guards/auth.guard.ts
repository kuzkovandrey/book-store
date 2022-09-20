import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@core/services';
import { AppRoutes } from '@core/values';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (this.authService.isAuthorized()) return true;

    this.router.navigate([AppRoutes.AUTH]);

    return false;
  }
}
