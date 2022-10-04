import { ApiGateway } from '@core/api/api.gateway';
import { ApiControlles } from '@book-store/shared/values';
import { Injectable } from '@angular/core';

import { CreateDeliveryPointDto, DeliveryModel } from '@book-store/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveryApi {
  constructor(private api: ApiGateway) {}

  createDeliveryPoint(body: CreateDeliveryPointDto): Observable<DeliveryModel> {
    return this.api.post<DeliveryModel>({
      url: ApiControlles.DELIVERY,
      body,
    });
  }

  getAllDeliveryPoints(): Observable<DeliveryModel[]> {
    return this.api.get<DeliveryModel[]>({
      url: ApiControlles.DELIVERY,
    });
  }

  changeDeliveryPointValues(
    id: number,
    body: CreateDeliveryPointDto
  ): Observable<DeliveryModel> {
    return this.api.patch<DeliveryModel>({
      url: `${ApiControlles.DELIVERY}/${id}`,
      body,
    });
  }

  deleteDeliveryPoint(id: number): Observable<DeliveryModel> {
    return this.api.delete<DeliveryModel>({
      url: `${ApiControlles.DELIVERY}/${id}`,
    });
  }
}
