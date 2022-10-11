import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import {
  SearchFilterItemChangeEvent,
  SearchFilterItemOptions,
} from '@features/search/types';
import { SearchFilterService } from '@features/search/services';
import { SearchFilterItemNames } from '@features/search/values';

@Component({
  selector: 'search-filter, [search-filter]',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent {
  @Input() initialCategoryId: number | undefined;

  @Input() searchFilterItemOptions: SearchFilterItemOptions[];

  readonly CATEGORY_ITEM = SearchFilterItemNames.CATEGORY;

  constructor(private searchFilterService: SearchFilterService) {}

  filterValueChanges(event: SearchFilterItemChangeEvent) {
    this.searchFilterService.handleFilterChanges(event);
  }
}
