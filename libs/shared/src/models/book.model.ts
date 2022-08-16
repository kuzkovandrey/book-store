import { Author } from './author.model';
import { Genre } from './genre.model';
import { Language } from './language.model';
import { Publisher } from './publisher.model';

export interface Book {
  title: string;
  description: string;
  pageCount: number;
  publicationYear: number;
  language: Language;
  picture: string;
  genre: Genre;
  publisher: Publisher;
  author: Author;
}
