import { ApiGateway } from './../../../core/api/api.gateway';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  CreateOrderDto,
  ApiControlles,
  SuccessCreateOrder,
  ApiQueryParams,
  OrderModel,
  OrderState,
} from '@book-store/shared';

@Injectable({
  providedIn: 'root',
})
export class OrdersApi {
  constructor(private api: ApiGateway) {}

  createOrder(order: CreateOrderDto): Observable<SuccessCreateOrder> {
    return this.api.post<SuccessCreateOrder>({
      url: ApiControlles.ORDERS,
      body: order,
    });
  }

  getOrderByTrack(track: string): Observable<OrderModel> {
    return this.api.get<OrderModel>({
      url: `${ApiControlles.ORDERS}${ApiControlles.BY_TRACK}`,
      params: {
        [ApiQueryParams.TRACK]: track,
      },
    });
  }

  getAllOrders(): Observable<OrderModel[]> {
    return this.api.get<OrderModel[]>({ url: ApiControlles.ORDERS });
  }

  changeState(orderId: number, state: OrderState): Observable<OrderModel> {
    return this.api.patch<OrderModel>({
      url: `${ApiControlles.ORDERS}${ApiControlles.CHANGE_STATE}`,
      body: {
        orderId,
        state,
      },
    });
  }
}
