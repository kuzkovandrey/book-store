import { Entity, Column, ManyToMany } from 'typeorm';

import { BaseEntity } from '@config';
import { BooksTableNames } from '@books/values';
import { BookEntity } from './book.entity';

@Entity({ name: BooksTableNames.AUTHOR })
export class AuthorEntity extends BaseEntity {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @ManyToMany(() => BookEntity, (book) => book.authors)
  books: BookEntity[];
}
