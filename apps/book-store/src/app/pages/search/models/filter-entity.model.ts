import {
  AuthorModel,
  GenreModel,
  LanguageModel,
  PublisherModel,
} from '@book-store/shared';

export type FilterEntity =
  | AuthorModel
  | GenreModel
  | LanguageModel
  | PublisherModel;
