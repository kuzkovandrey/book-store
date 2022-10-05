import { getIdArrayFromModel } from '@shared/utils';
import { Injectable } from '@angular/core';
import { SearchFilterModel } from '@book-store/shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchFilterItemChangeEvent } from '../types';
import { SearchFilterEntityNamesToQuery } from '../values';

@Injectable()
export class SearchFilterService {
  private readonly filterParams = new BehaviorSubject<
    Partial<SearchFilterModel>
  >({});

  get filterParams$(): Observable<Partial<SearchFilterModel>> {
    return this.filterParams.asObservable();
  }

  appendFilterParams(params: Partial<SearchFilterModel>) {
    this.filterParams.next({
      ...this.filterParams,
      ...params,
    });
  }

  private mapEventToFilterModel = ({
    name,
    entities,
  }: SearchFilterItemChangeEvent) => {
    const queryName = SearchFilterEntityNamesToQuery[name];

    if (!queryName) throw new Error('handleFilterChanges');

    return {
      ...this.filterParams.value,
      [queryName]: getIdArrayFromModel(entities),
    };
  };

  handleFilterChanges(event: SearchFilterItemChangeEvent) {
    this.filterParams.next(this.mapEventToFilterModel(event));
  }
}
