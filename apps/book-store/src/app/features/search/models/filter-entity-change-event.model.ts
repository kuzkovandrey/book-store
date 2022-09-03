import {
  AuthorModel,
  GenreModel,
  LanguageModel,
  PublisherModel,
} from '@book-store/shared/models';
import { FilterEntityNames } from '../values/filter-entity-names.enum';

export type FilterEntityValues =
  | AuthorModel[]
  | GenreModel[]
  | LanguageModel[]
  | PublisherModel[];

export interface FilterEntityChangeEvent {
  name: FilterEntityNames;
  values: FilterEntityValues;
}
