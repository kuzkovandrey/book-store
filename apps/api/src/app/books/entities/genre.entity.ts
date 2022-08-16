import { Entity, Column } from 'typeorm';

import { TableNames } from '@books/values';
import { BaseEntity } from '@config';

@Entity({ name: TableNames.GENRE })
export class GenreEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;
}
