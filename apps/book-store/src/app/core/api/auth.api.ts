import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, ApiControlles } from '@book-store/shared';

@Injectable()
export class AuthApi {
  constructor(private http: HttpClient) {}

  login(user: User): Observable<unknown> {
    return this.http.post<unknown>(
      `${ApiControlles.USER}${ApiControlles.LOGIN}`,
      user
    );
  }

  logout(): Observable<unknown> {
    return this.http.get<unknown>(
      `${ApiControlles.USER}${ApiControlles.LOGOUT}`
    );
  }
}
