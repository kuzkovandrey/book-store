import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiControlles, MainPageSection } from '@book-store/shared';
import { Observable, tap } from 'rxjs';

@Injectable()
export class MainApi {
  constructor(private http: HttpClient) {}

  getMainPageSecrions(): Observable<MainPageSection[]> {
    return this.http.get<MainPageSection[]>(ApiControlles.MAIN);
  }

  checkServiceHealth(): Observable<boolean> {
    return this.http
      .get<boolean>(`${ApiControlles.MAIN}${ApiControlles.HEALTH_SERVICE}`)
      .pipe(tap((r) => console.log(r)));
  }
}
