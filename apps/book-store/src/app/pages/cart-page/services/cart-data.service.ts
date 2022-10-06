import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import {
  CartItemCountChangeEvent,
  CartList,
  CartService,
} from '@features/cart';
import { ProductItem } from '@book-store/shared/dto';
import { ProductPriceService } from '@features/product';

@Injectable({ providedIn: 'root' })
export class CartDataService {
  private readonly cartListData = new BehaviorSubject<CartList>([]);

  get productItemList$(): Observable<ProductItem[]> {
    return this.cartListData
      .asObservable()
      .pipe(map(this.mapCartListToProductItemList));
  }

  get totalPrice$(): Observable<number> {
    return this.cartListData.asObservable().pipe(map(this.calculateTotalPrice));
  }

  get cartList$(): Observable<CartList> {
    return this.cartListData.asObservable();
  }

  constructor(
    private readonly productPriceService: ProductPriceService,
    private readonly cartService: CartService
  ) {}

  setCartList(cartList: CartList) {
    this.cartListData.next(cartList);
  }

  resetCartList() {
    this.cartListData.next([]);
    this.cartService.resetCart();
  }

  changeCountItems({ id, count }: CartItemCountChangeEvent) {
    const item = this.cartListData.value.find((item) => item.product.id === id);

    if (item) item.count = count;

    this.setCartList([...this.cartListData.value]);
  }

  deleteItemFromList(id: number) {
    const list = this.cartListData.value.filter(
      ({ product }) => product.id !== id
    );

    this.cartService.removeItemFromCart(id);
    this.setCartList([...list]);
  }

  calculateTotalPrice = (cartList: CartList): number => {
    return this.productPriceService.calculateTotalPrice(cartList);
  };

  private mapCartListToProductItemList = (
    cartList: CartList
  ): ProductItem[] => {
    return cartList.map(({ product, count }) => ({
      productId: product.id,
      count,
    }));
  };
}
