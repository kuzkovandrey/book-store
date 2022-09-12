import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity, TableNames } from '@core';
import { BuyerEntity } from './buyer.entity';
import { OrderState } from '@book-store/shared/values';
import { DeliveryPointEntity } from './delivery-point.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity({ name: TableNames.ORDER })
export class OrderEntity extends BaseEntity {
  @Column({ nullable: false, type: 'float' })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: OrderState,
    default: OrderState.PROCESS,
  })
  state: OrderState;

  @PrimaryGeneratedColumn('uuid')
  tracker: string;

  @ManyToOne(() => BuyerEntity)
  buyer: BuyerEntity;

  @ManyToOne(() => DeliveryPointEntity)
  deliveryPoint: DeliveryPointEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemEntity[];
}
