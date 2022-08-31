import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiControlles, MainPageSection } from '@book-store/shared';
import { Observable } from 'rxjs';

@Injectable()
export class MainApi {
  constructor(private http: HttpClient) {}

  getMainPageSecrions(): Observable<MainPageSection[]> {
    return this.http.get<MainPageSection[]>(ApiControlles.MAIN);
  }
}