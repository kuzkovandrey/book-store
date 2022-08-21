import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { delay, Observable } from 'rxjs';

import { environment } from '@env/environment';

@Injectable()
export class ProxyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const request = req.clone({
      url: environment.baseUrl + req.url,
    });

    return next.handle(request).pipe(delay(1000));
  }
}
