import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { OrderService } from '@orders/services';
import { BaseController } from '@core/base';
import {
  ChangeOrderStateDto,
  CreateOrderDto,
  ApiControlles,
  SuccessCreateOrder,
  ApiQueryParams,
  OrderStatus,
} from '@book-store/shared';
import { OrderEntity } from '@orders/entities';

@Controller(ApiControlles.ORDERS)
export class OrderController extends BaseController {
  constructor(private orderService: OrderService) {
    super(OrderController.name);
  }

  @Get()
  getAllOrders(): Promise<OrderEntity[]> {
    return this.orderService.getAllOrders();
  }

  @Post()
  async createOrder(@Body() dto: CreateOrderDto): Promise<SuccessCreateOrder> {
    try {
      return await this.orderService.createOrder(dto);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }

  @Post(ApiControlles.CHANGE_STATE)
  async changeOrderState(@Body() { orderId: id, state }: ChangeOrderStateDto) {
    try {
      return await this.orderService.changeOrderState(id, state);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }

  @Get(ApiControlles.TRACK_STATUS)
  trackOrderStatus(
    @Param(ApiQueryParams.TRACK) track: string
  ): Promise<OrderStatus> {
    return this.orderService.trackOrderStatus(track);
  }
}
