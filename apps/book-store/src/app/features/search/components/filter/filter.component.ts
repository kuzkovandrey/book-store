import { FilterEntityChangeEvent } from '@features/search/models';
import { CommomErrorMessages } from '@core/values/common-error-messages.enum';
import { AlertService } from '@core/services/alert.service';
import { LoadingService } from '@core/services/loading.service';
import { Subscription, tap } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FilterEntityItem, FilterService } from '@features/search/services';
import { FilterEntityNames } from '@features/search/values/filter-entity-names.enum';

@Component({
  selector: 'filter, [filter]',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() initialCategoryId: number | undefined;

  private readonly subscriptions = new Subscription();

  filterEntityItems: FilterEntityItem[];

  filterEntityNames = FilterEntityNames;

  constructor(
    private filterService: FilterService,
    private loadingService: LoadingService,
    private alertService: AlertService
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

    this.alertService.showError(CommomErrorMessages.UPLOAD_ERROR);
  };

  private setFilterEntityItems = (items: FilterEntityItem[]) => {
    this.filterEntityItems = items;
  };

  filterValueChanges(event: FilterEntityChangeEvent) {
    this.filterService.handleFilterChanges(event);
  }
}
