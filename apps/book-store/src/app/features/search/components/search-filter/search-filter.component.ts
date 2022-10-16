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

  isOpen = true;

  private readonly buttonTexts = {
    open: 'Показать фильтр',
    close: 'Скрыть фильтр',
  } as const;

  private readonly buttonIcons = {
    open: 'tuiIconChevronDownLarge',
    close: 'tuiIconChevronUpLarge',
  } as const;

  get buttonText(): string {
    return this.isOpen ? this.buttonTexts.close : this.buttonTexts.open;
  }

  get buttonIcon(): string {
    return this.isOpen ? this.buttonIcons.close : this.buttonIcons.open;
  }

  readonly CATEGORY_ITEM = SearchFilterItemNames.CATEGORY;

  constructor(private searchFilterService: SearchFilterService) {}

  filterValueChanges(event: SearchFilterItemChangeEvent) {
    this.searchFilterService.handleFilterChanges(event);
  }

  toggleFilterVisibility() {
    this.isOpen = !this.isOpen;
  }
}
