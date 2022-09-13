import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '@products/products.module';
import { DeliveryController } from './controllers/delivery.controller';
import { OrderController } from './controllers/order.controller';
import { BuyerEntity } from './entities/buyer.entity';
import { DeliveryPointEntity } from './entities/delivery-point.entity';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrderEntity } from './entities/order.entity';
import { BuyerService, DeliveryService, OrderService } from './services';
import { OrderItemService } from './services/order-item.service';
import { OrdersSubscriber } from './subscribers/orders.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DeliveryPointEntity,
      BuyerEntity,
      OrderEntity,
      OrderItemEntity,
    ]),
    ProductsModule,
  ],
  providers: [
    DeliveryService,
    BuyerService,
    OrderService,
    OrderItemService,
    OrdersSubscriber,
  ],
  controllers: [DeliveryController, OrderController],
})
export class OrdersModule {}
