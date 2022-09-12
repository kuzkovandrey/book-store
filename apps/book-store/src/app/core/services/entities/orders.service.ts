import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OrdersApi } from '@core/api';
import {
  OrderStatus,
  SuccessCreateOrder,
  CreateOrderDto,
} from '@book-store/shared';

@Injectable()
export class OrdersService {
  constructor(private ordersApi: OrdersApi) {}

  createOrder(order: CreateOrderDto): Observable<SuccessCreateOrder> {
    return this.ordersApi.createOrder(order);
  }

  trackOrderStatus(track: string): Observable<OrderStatus> {
    return this.ordersApi.trackOrderStatus(track);
  }
}
