import { SearchFilterModel, SearchPagesModel } from '@book-store/shared/models';

export interface SearchParams {
  text?: string;
  pageOptions?: SearchPagesModel;
  filters?: Partial<SearchFilterModel>;
}
