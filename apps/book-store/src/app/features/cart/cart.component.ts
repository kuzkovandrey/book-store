import { LoadingService } from './../../core/services/loading.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, tap } from 'rxjs';

import { CartService } from './services';
import { CartList } from './models/cart.model';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  cartList: CartList;

  constructor(
    private cartService: CartService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.cartService
        .getCartProductList()
        .pipe(tap(() => this.loadingService.setLoading(false)))
        .subscribe((cartList) => {
          this.cartList = cartList;
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.cartService.saveCartListToStorage(this.cartList);
  }

  deleteItemFromCartList(id: number) {
    this.cartList = this.cartList.filter(({ product }) => product.id !== id);
  }

  changeCountItems([id, count]: [id: number, count: number]) {
    const item = this.cartList.find((item) => item.product.id === id);

    if (!item) return;

    item.count = count;
  }
}
