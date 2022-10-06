import {
  HttpClientModule,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';

import { ApiProviders, MainApi } from './api';
import { LoadingService, AlertService, ModalDialogService } from './services';
import { AppStorage, AppStorageImpl, StorageKeys } from './services/storage';
import { InterceptorProviders } from './interceptors';
import { catchError, of, tap } from 'rxjs';
import { APP_SESSION_STORAGE } from './values';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AlertService,
    LoadingService,
    ModalDialogService,
    ...ApiProviders,
    ...InterceptorProviders,
    {
      provide: AppStorage,
      useFactory: () => new AppStorageImpl(localStorage),
    },
    {
      provide: APP_SESSION_STORAGE,
      useFactory: () => new AppStorageImpl(sessionStorage),
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory(mainApi: MainApi, injector: Injector) {
        const storage = <AppStorage>injector.get(APP_SESSION_STORAGE);

        return () =>
          mainApi.checkServiceHealth().pipe(
            tap(() => {
              storage.set(StorageKeys.SERVICE_UNAVAILABLE, false);
            }),
            catchError((error: HttpErrorResponse) => {
              if (error.status !== HttpStatusCode.ServiceUnavailable)
                return of(true);

              storage.set(StorageKeys.SERVICE_UNAVAILABLE, true);

              return of(true);
            })
          );
      },
      deps: [MainApi, Injector],
    },
  ],
})
export class CoreModule {}
