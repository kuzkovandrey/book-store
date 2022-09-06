import { CartItem, CartList, StorageCart } from './../models/cart.model';
import { Observable, of, mergeMap, map, toArray, catchError } from 'rxjs';
import { StorageKeys } from '@core/services/storage';
import { Injectable } from '@angular/core';
import { AppStorage } from '@core/services/storage';
import { ProductsService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private appStorage: AppStorage,
    private productsService: ProductsService
  ) {
    // appStorage.set<StorageCart>(StorageKeys.USER_CART, [
    //   {
    //     productId: 1,
    //     count: 1,
    //   },
    //   {
    //     productId: 2,
    //     count: 2,
    //   },
    // ]);
  }

  getCartProductList(): Observable<CartList> {
    const cart = this.appStorage.get<StorageCart>(StorageKeys.USER_CART);

    if (!cart || !cart?.length) return of([]);

    return of(...cart).pipe(
      mergeMap(({ productId, count }) =>
        this.productsService.getProductById(productId).pipe(
          map((product) => ({ product, count })),
          catchError(() => of({} as CartItem))
        )
      ),
      toArray(),
      map((list) => list.filter((item) => !!item?.product))
    );
  }
}
