import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { tap } from 'rxjs';

import { AppStorage, StorageKeys } from './services/storage';
import { InterceptorsProvider } from './interceptors';
import { APP_SESSION_STORAGE } from './values';
import { StoreHealthService, ServicesProvider } from './services';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ...InterceptorsProvider,
    ...ServicesProvider,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory(storeHealthService: StoreHealthService, injector: Injector) {
        const storage = <AppStorage>injector.get(APP_SESSION_STORAGE);

        return () =>
          storeHealthService.checkServiceHealth().pipe(
            tap((isWork) => {
              storage.set(StorageKeys.SERVICE_UNAVAILABLE, !isWork);
            })
          );
      },
      deps: [StoreHealthService, Injector],
    },
  ],
})
export class CoreModule {}
