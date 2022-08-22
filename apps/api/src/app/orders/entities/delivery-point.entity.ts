import { Entity, Column } from 'typeorm';
import { BaseEntity, TableNames } from '@core';

@Entity({ name: TableNames.DELIVERY_POINT })
export class DeliveryPointEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  address: string;

  @Column({ nullable: false, type: 'varchar' })
  schedule: string;

  @Column({ nullable: false, default: true, type: 'boolean' })
  isActive: boolean;
}
