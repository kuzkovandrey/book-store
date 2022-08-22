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
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, length: 500 })
  description: string;

  @Column({ nullable: false })
  pageCount: number;

  @Column({ nullable: false })
  publicationYear: number;

  @Column({ default: null })
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
