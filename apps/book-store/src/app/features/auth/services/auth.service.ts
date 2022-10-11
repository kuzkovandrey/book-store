import { Injectable } from '@angular/core';
import { User } from '@book-store/shared';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthApi } from '../api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authorized = new BehaviorSubject(false);

  get authorized$(): Observable<boolean> {
    return this.authorized.asObservable();
  }

  constructor(private authApi: AuthApi) {}

  setAuthState(isAuthtorized: boolean) {
    this.authorized.next(isAuthtorized);
  }

  isAuthorized(): boolean {
    return this.authorized.value;
  }

  login(user: User): Observable<unknown> {
    return this.authApi.login(user).pipe(tap(() => this.setAuthState(true)));
  }

  logout(): Observable<unknown> {
    return this.authApi.logout().pipe(tap(() => this.setAuthState(false)));
  }
}
