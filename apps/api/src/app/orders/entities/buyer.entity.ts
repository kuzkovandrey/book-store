import { Entity, Column } from 'typeorm';
import { BaseEntity, TableNames } from '@core';

@Entity({ name: TableNames.BUYER })
export class BuyerEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  firstName: string;

  @Column({ nullable: false, type: 'varchar' })
  email: string;
}
