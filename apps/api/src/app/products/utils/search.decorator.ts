import { ApiQueryParams } from '@book-store/shared/values';
import { getQueryArray } from '@core/utils';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const pageQueries: string[] = [
  ApiQueryParams.PAGE,
  ApiQueryParams.PER_PAGE,
];

export interface PagesQueryParams {
  page: number;
  perPage: number;
}

export interface SearchQueryParams {
  [ApiQueryParams.AUTHORS]: number[];
  [ApiQueryParams.GENRES]: number[];
  [ApiQueryParams.LANGS]: number[];
  [ApiQueryParams.PUBLISHER]: number[];
  [ApiQueryParams.YEAR_MAX]: number;
  [ApiQueryParams.YEAR_MIN]: number;
  [ApiQueryParams.PAGE]: number;
  [ApiQueryParams.PER_PAGE]: number;
}

export const SearchParams = createParamDecorator(
  ({ page = 1, perPage = 25 }: PagesQueryParams, ctx: ExecutionContext) => {
    const [args] = ctx.getArgs();
    const queries = <Partial<SearchQueryParams>>args.query;

    const pagesSearchParams: Partial<SearchQueryParams> = {
      [ApiQueryParams.PAGE]: queries[ApiQueryParams.PAGE] ?? page,
      [ApiQueryParams.PER_PAGE]: queries[ApiQueryParams.PER_PAGE] ?? perPage,
    };

    const entries = Object.entries(args.query).map(([key, value]) => {
      if (pageQueries.includes(key)) return;

      return [key, getQueryArray(value as number)];
    });

    return {
      ...pagesSearchParams,
      ...Object.fromEntries(entries),
    };
  }
);
