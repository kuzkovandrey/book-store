import {
  AuthorModel,
  GenreModel,
  LanguageModel,
  PublisherModel,
} from '@book-store/shared';

export type FilterEntities = {
  authors: AuthorModel[];
  genres: GenreModel[];
  languages: LanguageModel[];
  publishers: PublisherModel[];
};
