import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { ProxyInterceptor } from './proxy.interceptor';

export const InterceptorProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ProxyInterceptor,
    multi: true,
  },
];
