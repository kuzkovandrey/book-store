import { Entity, Column } from 'typeorm';

import { TableNames } from '@core/values';
import { BaseEntity } from '@core/base';

@Entity({ name: TableNames.GENRE })
export class GenreEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string;
}
