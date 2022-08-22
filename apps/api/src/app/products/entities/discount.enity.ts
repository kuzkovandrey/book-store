import { Entity, Column } from 'typeorm';

import { TableNames } from '@core/values';
import { BaseEntity } from '@core/base';

@Entity({ name: TableNames.DISCOUNT })
export class DiscountEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  percent: number;
}
