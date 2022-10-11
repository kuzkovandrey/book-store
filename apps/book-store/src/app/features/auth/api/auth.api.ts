import { ApiGateway } from '@core/api/api.gateway';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User, ApiControlles } from '@book-store/shared';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  constructor(private api: ApiGateway) {}

  login(body: User): Observable<unknown> {
    return this.api.post<unknown>({
      url: `${ApiControlles.USER}${ApiControlles.LOGIN}`,
      body,
    });
  }

  logout(): Observable<unknown> {
    return this.api.get<unknown>({
      url: `${ApiControlles.USER}${ApiControlles.LOGOUT}`,
    });
  }
}
