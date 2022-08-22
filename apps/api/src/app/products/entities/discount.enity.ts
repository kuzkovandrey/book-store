import { Entity, Column } from 'typeorm';

import { TableNames } from '@core/values';
import { BaseEntity } from '@core/base';

@Entity({ name: TableNames.DISCOUNT })
export class DiscountEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({ nullable: false, length: 500, type: 'varchar' })
  description: string;

  @Column({ nullable: false, default: 0, type: 'int' })
  percent: number;
}
