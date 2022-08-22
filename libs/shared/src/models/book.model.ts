import { AuthorModel } from './author.model';
import { Model } from './base.model';
import { GenreModel } from './genre.model';
import { LanguageModel } from './language.model';
import { PublisherModel } from './publisher.model';

export type Book = {
  title: string;
  description: string;
  pageCount: number;
  publicationYear: number;
  language: LanguageModel;
  picture: string;
  genre: GenreModel;
  publisher: PublisherModel;
  authors: AuthorModel[];
};

export type BookModel = Model<Book>;
