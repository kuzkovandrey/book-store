import { ApiQueryParams } from '@book-store/shared/values';

export enum SearchFilterItemNames {
  AUTHOR = 'Автор',
  GENRE = 'Жанр',
  LANGUAGE = 'Язык',
  PUBLISHER = 'Издатель',
  CATEGORY = 'Категория',
}

export const SearchFilterEntityNameList = [
  SearchFilterItemNames.AUTHOR,
  SearchFilterItemNames.GENRE,
  SearchFilterItemNames.LANGUAGE,
  SearchFilterItemNames.PUBLISHER,
  SearchFilterItemNames.CATEGORY,
];

export const SearchFilterEntityNamesToQuery = {
  [SearchFilterItemNames.AUTHOR]: ApiQueryParams.AUTHORS,
  [SearchFilterItemNames.GENRE]: ApiQueryParams.GENRES,
  [SearchFilterItemNames.LANGUAGE]: ApiQueryParams.LANGS,
  [SearchFilterItemNames.PUBLISHER]: ApiQueryParams.PUBLISHER,
  [SearchFilterItemNames.CATEGORY]: ApiQueryParams.CATEGORIES,
};
