import { Entity, Column, ManyToOne } from 'typeorm';

import { BaseEntity } from '@config';
import { BooksTableNames } from '@books/values';
import {
  LanguageEntity,
  GenreEntity,
  PublisherEntity,
  AuthorEntity,
} from '@books/entities';

@Entity({ name: BooksTableNames.BOOK })
export class BookEntity extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
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

  @ManyToOne(() => AuthorEntity)
  author: AuthorEntity;
}
