import { Author } from '../models/author.model';
import { Language } from '../models/language.model';

export interface CreateBookDto {
  language: Language;
  author: Author;
  genreName: string;
  publisherName: string;
  title: string;
  description: string;
  pageCount: number;
  publicationYear: number;
  picture: string;
}
