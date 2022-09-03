import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TuiIdentityMatcher, TuiStringHandler } from '@taiga-ui/cdk';
import { tuiItemsHandlersProvider } from '@taiga-ui/kit';
import {
  FilterEntity,
  FilterEntityChangeEvent,
  FilterEntityValues,
} from '@features/search/models';
import { FilterEntityNames } from '@features/search/values/filter-entity-names.enum';

export const STRINGIFY_ENTITY: TuiStringHandler<FilterEntity> = (
  item: FilterEntity
) =>
  'firstName' in item && 'lastName' in item
    ? `${item.firstName} ${item.lastName}`
    : `${item.name}`;

export const ID_MATCHER_ENTITY: TuiIdentityMatcher<FilterEntity> = (
  item1: FilterEntity,
  item2: FilterEntity
) => item1.id === item2.id;

@Component({
  selector: 'filter-entity, [filter-entity]',
  templateUrl: './filter-entity.component.html',
  styleUrls: ['./filter-entity.component.scss'],
  providers: [
    tuiItemsHandlersProvider({
      stringify: STRINGIFY_ENTITY,
      identityMatcher: ID_MATCHER_ENTITY,
    }),
  ],
})
export class FilterEntityComponent implements OnInit, OnDestroy {
  @Input() entityName: FilterEntityNames;

  @Input() entities: FilterEntity[];

  @Input() initialStateById: number | undefined;

  @Output() valueChanges = new EventEmitter<FilterEntityChangeEvent>();

  private readonly subscriptions = new Subscription();

  entityControl = new FormControl<FilterEntityValues>([]);

  ngOnInit() {
    this.subscriptions.add(
      this.entityControl.valueChanges.subscribe((values) => {
        this.valueChanges.emit({
          name: this.entityName,
          values: values as FilterEntityValues,
        });
      })
    );

    this.setInitialState();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private setInitialState() {
    if (this.initialStateById === undefined) return;

    const initialState = this.entities.find(
      ({ id }) => id === this.initialStateById
    );

    if (initialState) this.entityControl.setValue([initialState as any]);
  }
}
