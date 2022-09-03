import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';

import { CommonErrorMessages } from '@core/values';
import { AlertService, LoadingService } from '@core/services';
import { FilterEntityChangeEvent } from '@features/search/models';
import { FilterEntityItem, FilterService } from '@features/search/services';
import { FilterEntityNames } from '@features/search/values';

@Component({
  selector: 'filter, [filter]',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() initialCategoryId: number | undefined;

  private readonly subscriptions = new Subscription();

  filterEntityItems: FilterEntityItem[];

  filterEntityNames = FilterEntityNames;

  constructor(
    private filterService: FilterService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.filterService
        .getFilterEntities()
        .pipe(tap(() => this.loadingService.setLoading(false)))
        .subscribe({
          next: this.setFilterEntityItems,
          error: this.handleError,
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private handleError = () => {
    this.loadingService.setLoading(false);

    this.alertService.showError(CommonErrorMessages.UPLOAD_ERROR);
  };

  private setFilterEntityItems = (items: FilterEntityItem[]) => {
    this.filterEntityItems = items;

    this.changeDetectorRef.markForCheck();
  };

  filterValueChanges(event: FilterEntityChangeEvent) {
    this.filterService.handleFilterChanges(event);
  }
}
