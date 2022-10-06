import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap, tap } from 'rxjs';

import { LoadingService, AlertService } from '@core/services';
import { CommonErrorMessages } from '@core/values';
import { ProductModel, BookModel } from '@book-store/shared/models';
import { ProductInfoPageFacade } from './product-info-page.facade';

@Component({
  selector: 'product-info-page',
  templateUrl: './product-info-page.component.html',
  styleUrls: ['./product-info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfoPageComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  productId: number;

  hasProductInCart: boolean;

  product: ProductModel;

  book: BookModel;

  private readonly buttonTexts = {
    addToCart: 'Добавить в корзину',
    removeFromCart: 'Удалить из карзины',
  } as const;

  get buttonText(): string {
    return this.hasProductInCart
      ? this.buttonTexts.removeFromCart
      : this.buttonTexts.addToCart;
  }

  get isShowDiscountText(): boolean {
    return !!this.product.discount && this.product.onSale;
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
    private readonly alertService: AlertService,
    private readonly productInfoPageFacade: ProductInfoPageFacade
  ) {
    this.productId = (this.activatedRoute.snapshot.params as { id: number }).id;
  }

  ngOnInit() {
    this.checkProductCartState(this.productId);
    this.subscriptions.add(this.subscribeToChangeRoute());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private subscribeToChangeRoute(): Subscription {
    return this.activatedRoute.params
      .pipe(
        tap(() => this.loadingService.setLoading(true)),
        map(({ id }) => id as number),
        tap((id) => {
          this.productId = id;
        }),
        switchMap((id) => this.productInfoPageFacade.getProduct(id)),
        tap(() => this.loadingService.setLoading(false))
      )
      .subscribe({
        next: this.setProduct,
        error: this.handleError,
      });
  }

  private setProduct = (product: ProductModel) => {
    this.product = product;
    this.book = product.book;

    this.changeDetectorRef.markForCheck();
  };

  private handleError = () => {
    this.alertService.showError(CommonErrorMessages.UPLOAD_ERROR);
    this.loadingService.setLoading(false);
  };

  private toggleProductCartState() {
    this.hasProductInCart = !this.hasProductInCart;
    this.changeDetectorRef.markForCheck();
  }

  private checkProductCartState(id: number) {
    this.hasProductInCart = this.productInfoPageFacade.hasProductInCart(id);
  }

  onCartButtonClick() {
    this.productInfoPageFacade.handleCartButtonClick(this.product);
    this.toggleProductCartState();
  }
}
