import { Entity, Column, ManyToMany } from 'typeorm';

import { BaseEntity } from '@core/base';
import { TableNames } from '@core/values';
import { BookEntity } from './book.entity';

@Entity({ name: TableNames.AUTHOR })
export class AuthorEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  firstName: string;

  @Column({ nullable: false, type: 'varchar' })
  lastName: string;

  @ManyToMany(() => BookEntity, (book) => book.authors)
  books: BookEntity[];
}
