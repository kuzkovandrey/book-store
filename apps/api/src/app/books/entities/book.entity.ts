import { Entity, Column, ManyToOne, JoinTable, ManyToMany } from 'typeorm';

import { BaseEntity } from '@core/base';
import { TableNames } from '@core/values';
import {
  LanguageEntity,
  GenreEntity,
  PublisherEntity,
  AuthorEntity,
} from '@books/entities';

@Entity({ name: TableNames.BOOK })
export class BookEntity extends BaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  title: string;

  @Column({ nullable: false, length: 500, type: 'varchar' })
  description: string;

  @Column({ nullable: false, type: 'int' })
  pageCount: number;

  @Column({ nullable: false, type: 'int' })
  publicationYear: number;

  @Column({ default: null, type: 'varchar' })
  picture: string;

  @ManyToOne(() => LanguageEntity)
  language: LanguageEntity;

  @ManyToOne(() => GenreEntity)
  genre: GenreEntity;

  @ManyToOne(() => PublisherEntity)
  publisher: PublisherEntity;

  @ManyToMany(() => AuthorEntity, (author) => author.books)
  @JoinTable()
  authors: AuthorEntity[];
}
