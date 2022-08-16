import { Entity, Column } from 'typeorm';

import { BooksTableNames } from '@books/values';
import { BaseEntity } from '@config';

@Entity({ name: BooksTableNames.GENRE })
export class GenreEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;
}
