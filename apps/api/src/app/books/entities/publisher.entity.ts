import { Entity, Column } from 'typeorm';

import { BooksTableNames } from '@books/values';
import { BaseEntity } from '@config';

@Entity({ name: BooksTableNames.PUBLISHER })
export class PublisherEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;
}
