import {
  AuthorModel,
  GenreModel,
  LanguageModel,
  PublisherModel,
} from '@book-store/shared';
import { SearchFilterItemNames } from '../values';

export type SearchFilterEntity =
  | AuthorModel
  | GenreModel
  | LanguageModel
  | PublisherModel;

export interface SearchFilterItemChangeEvent {
  name: SearchFilterItemNames;
  entities: SearchFilterEntity[];
}

export interface SearchFilterItemOptions {
  hasItems: boolean;
  entities: SearchFilterEntity[];
  name: SearchFilterItemNames;
}
