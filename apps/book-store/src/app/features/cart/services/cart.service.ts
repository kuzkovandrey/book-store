import { Injectable } from '@angular/core';
import { Observable, of, mergeMap, map, toArray, catchError } from 'rxjs';

import { ProductsService, ProductPriceService } from '@core/services';
import { StorageKeys, AppStorage } from '@core/services/storage';
import { CartItem, CartList, StorageCartList } from '@features/cart/models';

@Injectable()
export class CartService {
  constructor(
    private appStorage: AppStorage,
    private productsService: ProductsService,
    private productPriceService: ProductPriceService
  ) {}

  private mapCartListToStorageCartList(list: CartList): StorageCartList {
    return list.map(({ product, count }) => ({
      productId: product.id,
      count,
    }));
  }

  saveCartListToStorage(list: CartList) {
    this.appStorage.set(
      StorageKeys.USER_CART,
      this.mapCartListToStorageCartList(list)
    );
  }

  resetStorageCartList() {
    this.appStorage.remove(StorageKeys.USER_CART);
  }

  getCartProductList(): Observable<CartList> {
    const cart = this.appStorage.get<StorageCartList>(StorageKeys.USER_CART);

    if (!cart || !cart?.length) return of([]);

    return of(...cart).pipe(
      mergeMap(({ productId, count }) =>
        this.productsService.getProductById(productId).pipe(
          map((product) => ({ product, count })),
          catchError(() => of({} as CartItem))
        )
      ),
      toArray(),
      map((list) => list.filter(({ product }) => !!product))
    );
  }

  calculateTotalPrice(cartList: CartList) {
    return cartList.reduce((totalCount, { product, count }) => {
      return (
        totalCount + this.productPriceService.calculatePrice(product, count)
      );
    }, 0);
  }
}
