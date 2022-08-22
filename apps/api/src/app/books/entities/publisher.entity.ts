import { Entity, Column } from 'typeorm';

import { TableNames } from '@core/values';
import { BaseEntity } from '@core/base';

@Entity({ name: TableNames.PUBLISHER })
export class PublisherEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;
}
