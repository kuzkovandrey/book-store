import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ChangeDetectorRef,
} from '@angular/core';
import { asyncScheduler } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';

import { AddableCartItem } from '@core/interfaces';
import { AppStorage, StorageKeys } from '@core/services/storage';
import { StorageCartList } from '@features/cart/models';
import { ProductCardComponent } from '@shared/components';

type CartState = 'in' | 'out';

@Component({
  selector: 'cart-item-wrapper',
  standalone: true,
  imports: [CommonModule, TuiButtonModule],
  templateUrl: './cart-item-wrapper.component.html',
  styleUrls: ['./cart-item-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemWrapperComponent implements AfterContentInit {
  @ContentChild(ProductCardComponent, { read: ProductCardComponent })
  private cartItem: AddableCartItem;

  private readonly options = {
    out: {
      text: 'Добавить',
      appearance: 'primary',
    },
    in: {
      text: 'Удалить',
      appearance: 'accent',
    },
  } as const;

  private currentState: CartState = 'out';

  private get storageCartList(): StorageCartList {
    return this.appStorage.get<StorageCartList>(
      StorageKeys.USER_CART
    ) as StorageCartList;
  }

  private set storageCartList(list: StorageCartList) {
    this.appStorage.set(StorageKeys.USER_CART, list);
  }

  get buttonOptions() {
    return this.options[this.currentState];
  }

  onSale = false;

  constructor(
    private appStorage: AppStorage,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterContentInit() {
    asyncScheduler.schedule(this.setInitialCartState);

    this.onSale = this.cartItem.onSale();
  }

  private getReversState(): CartState {
    return this.currentState === 'in' ? 'out' : 'in';
  }

  private setInitialCartState = () => {
    const cartList = this.storageCartList;

    if (!cartList) {
      this.changeDetectorRef.markForCheck();
      return;
    }

    const cartItem = cartList.find(
      ({ productId }) => productId === this.cartItem.getId()
    );

    this.currentState = cartItem?.productId ? 'in' : 'out';
    this.changeDetectorRef.markForCheck();
  };

  private addItemToCart = (productId: number) => {
    const cartList = this.storageCartList ?? [];

    cartList.push({
      productId,
      count: 1,
    });

    this.storageCartList = cartList;
  };

  private removeItemFromCart = (id: number) => {
    const cartList = this.storageCartList;
    const index = cartList.findIndex(({ productId }) => productId === id);

    if (index === -1) return;

    cartList.splice(index, 1);
    this.storageCartList = cartList;
  };

  toggleCartState = () => {
    asyncScheduler.schedule(() => {
      const id = this.cartItem.getId();

      if (this.currentState === 'in') this.removeItemFromCart(id);
      else this.addItemToCart(id);

      this.currentState = this.getReversState();
      this.changeDetectorRef.markForCheck();
    });
  };
}
