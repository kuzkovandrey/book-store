import { ApiQueryParams } from '../values';

export interface SearchFilterModel {
  [ApiQueryParams.AUTHORS]: number[];
  [ApiQueryParams.GENRES]: number[];
  [ApiQueryParams.LANGS]: number[];
  [ApiQueryParams.PUBLISHER]: number[];
  [ApiQueryParams.YEAR_MAX]: number;
  [ApiQueryParams.YEAR_MIN]: number;
}

export interface SearchPagesModel {
  [ApiQueryParams.PAGE]: number;
  [ApiQueryParams.PER_PAGE]: number;
}

export interface SearchText {
  text?: string;
}

export interface SearchQueryParams
  extends SearchPagesModel,
    SearchText,
    Partial<SearchFilterModel> {}
