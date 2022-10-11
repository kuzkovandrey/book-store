import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { ErrorsInterceptor } from './errors.interceptor';
import { ProxyInterceptor } from './proxy.interceptor';

export const InterceptorsProvider: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ProxyInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorsInterceptor,
    multi: true,
  },
];
