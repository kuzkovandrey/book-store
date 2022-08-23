import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BookApi } from './api/books.api';
import { DeliveryApi } from './api/delivery.api';
import { DiscountsApi } from './api/discounts.api';
import { ProductsApi } from './api/products.api';
import { ProxyInterceptor } from './interceptors/proxy.interceptor';
import { AlertService } from './services/alert.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    BookApi,
    ProductsApi,
    DiscountsApi,
    DeliveryApi,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProxyInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
