import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OrdersApi } from '@core/api';
import {
  SuccessCreateOrder,
  CreateOrderDto,
  OrderModel,
  OrderState,
} from '@book-store/shared';

@Injectable()
export class OrdersService {
  constructor(private ordersApi: OrdersApi) {}

  createOrder(order: CreateOrderDto): Observable<SuccessCreateOrder> {
    return this.ordersApi.createOrder(order);
  }

  getOrderByTrack(track: string): Observable<OrderModel> {
    return this.ordersApi.getOrderByTrack(track);
  }

  getAllOrders(): Observable<OrderModel[]> {
    return this.ordersApi.getAllOrders();
  }

  changeState(orderId: number, state: OrderState): Observable<OrderModel> {
    return this.ordersApi.changeState(orderId, state);
  }
}
