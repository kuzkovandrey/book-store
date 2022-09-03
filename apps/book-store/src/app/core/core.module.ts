import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ApiProviders } from './api';
import { EntitySerivceProviders } from './services/entities';
import { LoadingService, AlertService } from './services';
import { AppStorage, AppStorageImpl } from './services/storage';
import { InterceptorProviders } from './interceptors';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AlertService,
    LoadingService,
    ...ApiProviders,
    ...EntitySerivceProviders,
    ...InterceptorProviders,
    {
      provide: AppStorage,
      useFactory: () => new AppStorageImpl(localStorage),
    },
  ],
})
export class CoreModule {}
