import { Author } from '../models/author.model';
import { Language } from '../models/language.model';

export type CreateBookDto = {
  language: Language;
  authors: Author[];
  genreName: string;
  publisherName: string;
  title: string;
  description: string;
  pageCount: number;
  publicationYear: number;
  picture: string;
};
