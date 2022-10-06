import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, LoadingService } from '@core/services';
import { AppRoutes, CommonErrorMessages } from '@core/values';
import { CartItem, CartItemCountChangeEvent, CartList } from '@features/cart';
import { CartPageFacade, CartDataService } from '@pages/cart-page/services';
import { Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'cart-item-list',
  templateUrl: './cart-item-list.component.html',
  styleUrls: ['./cart-item-list.component.scss'],
})
export class CartItemListComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  readonly totalPrice$: Observable<number>;

  readonly cartList$: Observable<CartList>;

  constructor(
    private cartPageFacade: CartPageFacade,
    private cartDataService: CartDataService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.cartList$ = cartDataService.cartList$;
    this.totalPrice$ = cartDataService.totalPrice$;
  }

  ngOnInit() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.cartPageFacade
        .getCartList()
        .pipe(tap(() => this.loadingService.setLoading(false)))
        .subscribe({
          next: this.setCartList,
          error: this.handleError,
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private setCartList = (cartList: CartList) => {
    this.cartDataService.setCartList(cartList);
  };

  private handleError = () => {
    this.alertService.showError(CommonErrorMessages.UPLOAD_ERROR);
  };

  navigateToProductPage(id: number) {
    this.router.navigate([AppRoutes.PRODUCT, id]);
  }

  deleteItemFromCartList(id: number) {
    this.cartDataService.deleteItemFromList(id);
  }

  changeCountItems(changes: CartItemCountChangeEvent) {
    this.cartDataService.changeCountItems(changes);
  }

  trackByProductId(id: unknown, item: CartItem): number {
    return item.product.id;
  }
}
