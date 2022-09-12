import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@core/base';
import { OrderEntity } from '@orders/entities';
import {
  CreateOrderDto,
  OrderState,
  SuccessCreateOrder,
} from '@book-store/shared';
import { ProductsService } from '@products/services';
import { DeliveryService } from './delivery.service';
import { OrderItemService } from './order-item.service';
import { BuyerService } from './buyer.service';

@Injectable()
export class OrderService extends BaseService<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    repository: Repository<OrderEntity>,
    private buyerService: BuyerService,
    private deliveryService: DeliveryService,
    private productsService: ProductsService,
    private orderItemService: OrderItemService
  ) {
    super(OrderEntity.name, repository);
  }

  async createOrder({
    buyer: newBuyer,
    deliveryPointId,
    productList,
    totalPrice,
  }: CreateOrderDto): Promise<SuccessCreateOrder> {
    const buyer = await this.buyerService.createIfNotExists(newBuyer);
    const deliveryPoint = await this.deliveryService.findOneBy({
      id: deliveryPointId,
    });

    const createdOrder = await this.create({
      buyer,
      deliveryPoint,
      totalPrice,
    });

    const products = await this.productsService.findAll({
      where: [...productList.map(({ productId: id }) => ({ id }))],
    });

    const orderItems = productList.map(({ productId, count }) => {
      const product = products.find(({ id }) => id === productId);

      return this.orderItemService.repositoryInstance.create({
        product: product,
        order: createdOrder,
        count,
      });
    });

    await this.orderItemService.repositoryInstance.save(orderItems);

    const { id, tracker } = createdOrder;

    return {
      id,
      tracker,
    };
  }

  async changeOrderState(id: number, state: OrderState): Promise<OrderEntity> {
    const order = await this.findOneBy({ id });
    order.state = state;

    return await order.save();
  }

  getAllOrders(): Promise<OrderEntity[]> {
    return this.findAll({
      relations: {
        deliveryPoint: true,
        buyer: true,
        orderItems: {
          product: true,
        },
      },
    });
  }

  async getOrderByTrack(tracker: string): Promise<OrderEntity> {
    const order = await this.findOneBy(
      { tracker },
      {
        orderItems: true,
        deliveryPoint: true,
        buyer: true,
      }
    );

    return order;
  }
}
