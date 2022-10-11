import { ApiGateway } from './../api/api.gateway';
import { Injectable } from '@angular/core';
import { ApiControlles } from '@book-store/shared/values';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable()
export class StoreHealthService {
  constructor(private api: ApiGateway) {}

  checkServiceHealth(): Observable<boolean> {
    return this.api
      .get<boolean>({
        url: `${ApiControlles.MAIN}${ApiControlles.HEALTH_SERVICE}`,
      })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
