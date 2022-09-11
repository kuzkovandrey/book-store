import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity, TableNames } from '@core';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '@products/entities';

@Entity({ name: TableNames.ORDER_ITEM })
export class OrderItemEntity extends BaseEntity {
  @Column({ nullable: false, type: 'int', default: 1 })
  count: number;

  @PrimaryColumn('int')
  orderId: number;

  @PrimaryColumn('int')
  productId: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderItems)
  product: OrderEntity;
}
