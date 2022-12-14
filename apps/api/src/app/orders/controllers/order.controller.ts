import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

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
import { AuthenticatedGuard } from '@auth';

@Controller(ApiControlles.ORDERS)
export class OrderController extends BaseController {
  constructor(private orderService: OrderService) {
    super(OrderController.name);
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
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

  @Patch(ApiControlles.CHANGE_STATE)
  @UseGuards(AuthenticatedGuard)
  async changeOrderState(@Body() { orderId: id, state }: ChangeOrderStateDto) {
    try {
      return await this.orderService.changeOrderState(id, state);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }

  @Get(ApiControlles.BY_TRACK)
  async getOrderByTrack(
    @Query(ApiQueryParams.TRACK) track: string
  ): Promise<OrderStatus> {
    try {
      return await this.orderService.getOrderByTrack(track);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }
}
