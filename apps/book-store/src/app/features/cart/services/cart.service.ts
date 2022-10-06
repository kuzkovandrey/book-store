import { Injectable } from '@angular/core';

import { StorageKeys, AppStorage } from '@core/services/storage';
import { Observable, of } from 'rxjs';
import { StorageCartItem } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private get cartStorage(): StorageCartItem[] {
    return (
      this.appStorage.get<StorageCartItem[]>(StorageKeys.USER_PRODUCT_CART) ??
      []
    );
  }

  private set cartStorage(cartStorageList: StorageCartItem[]) {
    this.appStorage.set(StorageKeys.USER_PRODUCT_CART, cartStorageList);
  }

  constructor(private appStorage: AppStorage) {}

  getAll$(): Observable<StorageCartItem[]> {
    return of(this.cartStorage);
  }

  appendItemToCart(item: StorageCartItem) {
    const storage = this.cartStorage;
    storage.push(item);
    this.cartStorage = storage;
  }

  removeItemFromCart(itemId: number) {
    let storage = this.cartStorage;
    storage = storage.filter(({ id }) => itemId !== id);
    this.cartStorage = storage;
  }

  hasItemInCart(itemId: number): boolean {
    return !!this.cartStorage?.find(({ id }) => itemId === id);
  }

  resetCart() {
    this.appStorage.remove(StorageKeys.USER_PRODUCT_CART);
  }
}
