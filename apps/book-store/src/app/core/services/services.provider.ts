import { Provider } from '@angular/core';

import { AlertService } from './alert.service';
import { LoadingService } from './loading.service';
import { ModalDialogService } from './modal-dialog.service';
import { AppStorage, AppStorageImpl } from './storage';
import { StoreHealthService } from './store-health.service';
import { APP_SESSION_STORAGE } from '../values';

export const ServicesProvider: Provider[] = [
  AlertService,
  LoadingService,
  ModalDialogService,
  StoreHealthService,
  {
    provide: AppStorage,
    useFactory: () => new AppStorageImpl(localStorage),
  },
  {
    provide: APP_SESSION_STORAGE,
    useFactory: () => new AppStorageImpl(sessionStorage),
  },
];
