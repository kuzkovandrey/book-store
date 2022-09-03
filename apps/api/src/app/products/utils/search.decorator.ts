import { SearchPagesModel, SearchQueryParams } from '@book-store/shared/models';
import { ApiQueryParams } from '@book-store/shared/values';
import { getQueryArray } from '@core/utils';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const pageQueries: string[] = [ApiQueryParams.PAGE, ApiQueryParams.PER_PAGE];

export const SearchParams = createParamDecorator(
  ({ page = 1, perPage = 25 }: SearchPagesModel, ctx: ExecutionContext) => {
    const [args] = ctx.getArgs();
    const queries = <SearchQueryParams>args.query;

    console.log(queries);

    const pagesSearchParams: SearchQueryParams = {
      [ApiQueryParams.PAGE]: queries[ApiQueryParams.PAGE] ?? page,
      [ApiQueryParams.PER_PAGE]: queries[ApiQueryParams.PER_PAGE] ?? perPage,
      ...(queries[ApiQueryParams.TEXT]
        ? { [ApiQueryParams.TEXT]: queries[ApiQueryParams.TEXT] }
        : {}),
    };

    const entries = Object.entries(queries).map(([key, value]) => {
      if (pageQueries.includes(key)) return [];

      return [key, getQueryArray(value as number)];
    });

    return {
      ...(entries.length ? Object.fromEntries(entries) : {}),
      ...pagesSearchParams,
    };
  }
);
