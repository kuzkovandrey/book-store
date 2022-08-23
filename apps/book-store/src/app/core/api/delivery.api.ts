import { ApiControlles } from '@book-store/shared/values';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CreateDeliveryPointDto, DeliveryModel } from '@book-store/shared';
import { Observable } from 'rxjs';

@Injectable()
export class DeliveryApi {
  constructor(private http: HttpClient) {}

  createDeliveryPoint(
    delivery: CreateDeliveryPointDto
  ): Observable<DeliveryModel> {
    return this.http.post<DeliveryModel>(ApiControlles.DELIVERY, delivery);
  }

  getAllDeliveryPoints(): Observable<DeliveryModel[]> {
    return this.http.get<DeliveryModel[]>(ApiControlles.DELIVERY);
  }

  changeDeliveryPointValues(
    id: number,
    changes: CreateDeliveryPointDto
  ): Observable<DeliveryModel> {
    return this.http.patch<DeliveryModel>(
      `${ApiControlles.DELIVERY}/${id}`,
      changes
    );
  }

  deleteDeliveryPoint(id: number): Observable<DeliveryModel> {
    return this.http.delete<DeliveryModel>(`${ApiControlles.DELIVERY}/${id}`);
  }
}
