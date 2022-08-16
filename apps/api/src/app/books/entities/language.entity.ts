import { Entity, Column } from 'typeorm';

import { BooksTableNames } from '@books/values';
import { BaseEntity } from '@config';

@Entity({ name: BooksTableNames.LANGUAGE })
export class LanguageEntity extends BaseEntity {
  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  name: string;
}
