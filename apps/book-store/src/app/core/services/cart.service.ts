import { Injectable } from '@angular/core';
import { Observable, of, mergeMap, map, toArray, catchError } from 'rxjs';

import { ProductsService, ProductPriceService } from '@core/services';
import { StorageKeys, AppStorage } from '@core/services/storage';
import { CartItem, CartList, StorageCartList } from '@features/cart/models';
import { ProductModel } from '@book-store/shared/models';

@Injectable()
export class CartService {
  private get cartStorage(): StorageCartList {
    return this.appStorage.get<StorageCartList>(StorageKeys.USER_CART) ?? [];
  }

  private set cartStorage(cartStorageList: StorageCartList) {
    this.appStorage.set(StorageKeys.USER_CART, cartStorageList);
  }

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

  hasProductInCartStorage(id: number): boolean {
    return !!this.cartStorage?.find(({ productId }) => productId === id);
  }

  addProductToStorage({ id: productId }: ProductModel) {
    const storage = this.cartStorage;
    storage.push({
      productId,
      count: 1,
    });
    this.cartStorage = storage;
  }

  removeProductFromStorage({ id }: ProductModel) {
    let storage = this.cartStorage;
    storage = storage.filter(({ productId }) => productId !== id);
    this.cartStorage = storage;
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
    const totalPrice = cartList.reduce((totalCount, { product, count }) => {
      return (
        totalCount + this.productPriceService.calculatePrice(product, count)
      );
    }, 0);

    return Math.round(totalPrice * 100) / 100;
  }
}
