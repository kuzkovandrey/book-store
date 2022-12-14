import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SearchBarService } from '@features/search';

@Component({
  selector: 'search-bar, [search-bar]',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  searchInput = new FormControl<string>('');

  constructor(private searchBarService: SearchBarService) {}

  onClickSearchButton() {
    this.searchBarService.setSearchValue(this.searchInput.value as string);
  }

  ngOnInit() {
    this.subscriptions.add(
      this.searchBarService.reset$.subscribe(() => {
        this.searchInput.reset();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
