import { Entity, Column } from 'typeorm';

import { TableNames } from '@core/values';
import { BaseEntity } from '@core/base';

@Entity({ name: TableNames.CATEGORY })
export class CategoryEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string;
}
