import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadingService {
  private readonly loading = new BehaviorSubject(false);

  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  setLoading(loading: boolean) {
    console.log('set LOADING', loading);
    this.loading.next(loading);
  }
}
