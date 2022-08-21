import { Author } from './author.model';
import { Model } from './base.model';
import { Genre } from './genre.model';
import { Language } from './language.model';
import { Publisher } from './publisher.model';

export interface Book {
  title: string;
  description: string;
  pageCount: number;
  publicationYear: number;
  language: Model<Language>;
  picture: string;
  genre: Model<Genre>;
  publisher: Model<Publisher>;
  authors: Model<Author>[];
}
