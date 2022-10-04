import { CartService } from '@features/cart/services/cart.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, tap, switchMap } from 'rxjs';

import { LoadingService } from '@core/services';
import { ProductModel, BookModel } from '@book-store/shared/models';
import { ProductsService } from '@features/product';

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

  buttonTexts = {
    addToCart: 'Добавить в корзину',
    removeFromCart: 'Удалить из карзины',
  };

  get hasProductInCart(): boolean {
    return this.cartService.hasProductInCartStorage(this.product.id);
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.getProduct$
        .pipe(
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
  }

  onCartButtonClick() {
    if (this.hasProductInCart)
      this.cartService.removeProductFromStorage(this.product);
    else this.cartService.addProductToStorage(this.product);
  }
}
