import { Entity, Column } from 'typeorm';

import { TableNames } from '@books/values';
import { BaseEntity } from '@config';

@Entity({ name: TableNames.PUBLISHER })
export class PublisherEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;
}
