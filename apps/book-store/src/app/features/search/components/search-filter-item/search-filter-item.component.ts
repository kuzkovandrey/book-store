import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TuiIdentityMatcher, TuiStringHandler } from '@taiga-ui/cdk';
import { tuiItemsHandlersProvider } from '@taiga-ui/kit';
import {
  SearchFilterEntity,
  SearchFilterItemChangeEvent,
  SearchFilterItemOptions,
} from '@features/search/types';

const STRINGIFY_ENTITY: TuiStringHandler<SearchFilterEntity> = (
  item: SearchFilterEntity
): string =>
  'firstName' in item && 'lastName' in item
    ? `${item.firstName} ${item.lastName}`
    : `${item.name}`;

const ID_MATCHER_ENTITY: TuiIdentityMatcher<SearchFilterEntity> = (
  item1: SearchFilterEntity,
  item2: SearchFilterEntity
): boolean => item1.id === item2.id;

@Component({
  selector: 'search-filter-item, [search-filter-item]',
  templateUrl: './search-filter-item.component.html',
  styleUrls: ['./search-filter-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiItemsHandlersProvider({
      stringify: STRINGIFY_ENTITY,
      identityMatcher: ID_MATCHER_ENTITY,
    }),
  ],
})
export class SearchFilterItemComponent implements OnInit, OnDestroy {
  @Input() searchFilterItemOptions: SearchFilterItemOptions;

  @Input() initialStateById: number | undefined;

  @Output() valueChanges = new EventEmitter<SearchFilterItemChangeEvent>();

  private readonly subscriptions = new Subscription();

  entityControl = new FormControl<SearchFilterEntity[]>([]);

  ngOnInit() {
    this.subscriptions.add(this.subscribeToControlValueChanges());

    this.setInitialState();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private subscribeToControlValueChanges(): Subscription {
    return this.entityControl.valueChanges.subscribe((entities) => {
      if (!entities) return;

      this.valueChanges.emit({
        name: this.searchFilterItemOptions.name,
        entities,
      });
    });
  }

  private setInitialState() {
    if (this.initialStateById === undefined) return;

    const initialState = this.searchFilterItemOptions.entities.find(
      ({ id }) => id === this.initialStateById
    );

    if (initialState) this.entityControl.setValue([initialState]);
  }
}
