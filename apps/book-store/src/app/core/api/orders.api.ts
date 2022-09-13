import { HttpClient } from '@angular/common/http';
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

@Injectable()
export class OrdersApi {
  constructor(private http: HttpClient) {}

  createOrder(order: CreateOrderDto): Observable<SuccessCreateOrder> {
    return this.http.post<SuccessCreateOrder>(ApiControlles.ORDERS, order);
  }

  getOrderByTrack(track: string): Observable<OrderModel> {
    return this.http.get<OrderModel>(
      `${ApiControlles.ORDERS}${ApiControlles.BY_TRACK}`,
      {
        params: {
          [ApiQueryParams.TRACK]: track,
        },
      }
    );
  }

  getAllOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(ApiControlles.ORDERS);
  }

  changeState(orderId: number, state: OrderState): Observable<OrderModel> {
    return this.http.patch<OrderModel>(
      `${ApiControlles.ORDERS}${ApiControlles.CHANGE_STATE}`,
      {
        orderId,
        state,
      }
    );
  }
}
