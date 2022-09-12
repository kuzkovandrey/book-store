import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  CreateOrderDto,
  ApiControlles,
  SuccessCreateOrder,
  ApiQueryParams,
  OrderStatus,
} from '@book-store/shared';

@Injectable()
export class OrdersApi {
  constructor(private http: HttpClient) {}

  createOrder(order: CreateOrderDto): Observable<SuccessCreateOrder> {
    return this.http.post<SuccessCreateOrder>(ApiControlles.ORDERS, order);
  }

  trackOrderStatus(track: string): Observable<OrderStatus> {
    return this.http.get<OrderStatus>(
      `${ApiControlles.ORDERS}${ApiControlles.TRACK_STATUS}`,
      {
        params: {
          [ApiQueryParams.TRACK]: track,
        },
      }
    );
  }
}
