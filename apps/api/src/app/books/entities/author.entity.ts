import { Entity, Column, ManyToMany } from 'typeorm';

import { BaseEntity } from '@core/base';
import { TableNames } from '@core/values';
import { BookEntity } from './book.entity';

@Entity({ name: TableNames.AUTHOR })
export class AuthorEntity extends BaseEntity {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @ManyToMany(() => BookEntity, (book) => book.authors)
  books: BookEntity[];
}
