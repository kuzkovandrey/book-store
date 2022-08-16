import { Entity, Column } from 'typeorm';

import { TableNames } from '@products/values';
import { BaseEntity } from '@config';

@Entity({ name: TableNames.DISCOUNT })
export class DiscountEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;
}
