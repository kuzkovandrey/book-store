import { LoadingService } from './../../core/services/loading.service';
import { FilterService } from '@features/search/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, switchMap, tap } from 'rxjs';
import { SearchBarService } from './services/search-bar.service';
import { ProductsService } from '@core/services';
import { ProductModel, SearchFilterModel } from '@book-store/shared/models';
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private filterParams: Partial<SearchFilterModel> = {};

  resultList: ProductModel[];

  constructor(
    private searchBarService: SearchBarService,
    private productsService: ProductsService,
    private filterService: FilterService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.productsService
        .search({
          pageOptions: { page: 1, perPage: 25 },
        })
        .subscribe((resultList) => {
          this.resultList = resultList;
        })
    );

    this.subscriptions.add(
      this.searchBarService.search$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap((text) =>
            this.productsService.search({
              text,
              filters: this.filterParams,
            })
          ),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe((resultList) => {
          this.resultList = resultList;
        })
    );

    this.subscriptions.add(
      this.filterService.filterParams$.subscribe((filterParams) => {
        this.filterParams = filterParams;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
