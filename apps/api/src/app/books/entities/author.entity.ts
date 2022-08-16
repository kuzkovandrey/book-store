import { Entity, Column } from 'typeorm';

import { BaseEntity } from '@config';
import { BooksTableNames } from '@books/values';

@Entity({ name: BooksTableNames.AUTHOR })
export class AuthorEntity extends BaseEntity {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;
}
