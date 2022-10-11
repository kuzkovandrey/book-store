import { Injectable } from '@angular/core';
import { DeliveryModel, CreateDeliveryPointDto } from '@book-store/shared';
import { DeliveryApi } from '@features/delivery/api/delivery.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  constructor(private deliveryApi: DeliveryApi) {}

  createDeliveryPoint(
    point: CreateDeliveryPointDto
  ): Observable<DeliveryModel> {
    return this.deliveryApi.createDeliveryPoint(point);
  }

  getAllDeliveryPoints(): Observable<DeliveryModel[]> {
    return this.deliveryApi.getAllDeliveryPoints();
  }

  deleteDeliveryPoint(id: number): Observable<DeliveryModel> {
    return this.deliveryApi.deleteDeliveryPoint(id);
  }

  changeDeliveryPointValues(
    id: number,
    changes: CreateDeliveryPointDto
  ): Observable<DeliveryModel> {
    return this.deliveryApi.changeDeliveryPointValues(id, changes);
  }
}
