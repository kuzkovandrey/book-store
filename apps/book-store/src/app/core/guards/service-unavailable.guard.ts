import { Inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { AppStorage, StorageKeys } from '@core/services/storage';
import { AppRoutes, APP_SESSION_STORAGE } from '@core/values';
@Injectable({ providedIn: 'root' })
export class ServiceUnavailableGuard implements CanActivate, CanActivateChild {
  constructor(
    @Inject(APP_SESSION_STORAGE) private storage: AppStorage,
    private router: Router
  ) {}

  canActivate(): boolean {
    const isUnavailable = this.storage.get(StorageKeys.SERVICE_UNAVAILABLE);

    if (isUnavailable) {
      this.router.navigate([AppRoutes.ERROR]);
      return false;
    }

    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
