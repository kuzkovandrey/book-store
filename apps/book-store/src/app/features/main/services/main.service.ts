import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MainApi } from '@core/api';
import { MainPageSection } from '@book-store/shared';

@Injectable()
export class MainService {
  constructor(private mainApi: MainApi) {}

  getMainPageSecrions(): Observable<MainPageSection[]> {
    return this.mainApi.getMainPageSecrions();
  }
}
