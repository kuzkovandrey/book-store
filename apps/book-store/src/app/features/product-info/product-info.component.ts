import { Subject, Subscription, tap, switchMap } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService, LoadingService, AlertService } from '@core/services';
import { ProductModel, BookModel } from '@book-store/shared/models';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private readonly getProduct$ = new Subject<number>();

  product: ProductModel;

  book: BookModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.getProduct$
        .pipe(
          tap((e) => console.log(e)),
          tap(() => this.loadingService.setLoading(true)),
          switchMap((id) => this.productsService.getProductById(id)),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe((product) => {
          this.product = product;
          this.book = product.book;

          this.changeDetectorRef.markForCheck();
        })
    );

    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params) => {
        const { id } = params as { id: number };

        this.getProduct$.next(id);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    console.log('ngOnDestroy');
  }
}
