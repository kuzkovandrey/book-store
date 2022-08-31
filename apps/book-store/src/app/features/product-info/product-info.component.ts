import { Subscription, tap } from 'rxjs';
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
import { CommomErrorMessages } from '@core/values/common-error-messages.enum';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  private readonly productId: number;

  private readonly subscriptions = new Subscription();

  product: ProductModel;

  book: BookModel;

  get authors(): string {
    return this.book.authors
      .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
      .join(' ');
  }

  constructor(
    activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.productId = (activatedRoute.snapshot.params as { id: number }).id;
  }

  ngOnInit() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.productsService
        .getProductById(this.productId)
        .pipe(tap(() => this.loadingService.setLoading(false)))
        .subscribe((product) => {
          this.product = product;
          this.book = product.book;

          this.changeDetectorRef.markForCheck();
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
