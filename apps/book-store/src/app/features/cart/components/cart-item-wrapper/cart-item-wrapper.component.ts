import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { asyncScheduler } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';

import { CartService } from '@features/cart/services';

@Component({
  selector: 'cart-item-wrapper',
  standalone: true,
  imports: [CommonModule, TuiButtonModule],
  templateUrl: './cart-item-wrapper.component.html',
  styleUrls: ['./cart-item-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemWrapperComponent {
  @Input() itemId: number;

  @Input() isShowCartButton: boolean;

  private readonly options = {
    out: {
      text: 'Добавить в корзину',
      appearance: 'primary',
    },
    in: {
      text: 'Удалить из корзины',
      appearance: 'accent',
    },
  } as const;

  private readonly INITIAL_ITEM_COUNT = 1;

  private get hasItemInCart(): boolean {
    return this.cartService.hasItemInCart(this.itemId);
  }

  get buttonOptions() {
    return this.hasItemInCart ? this.options.in : this.options.out;
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private cartService: CartService
  ) {}

  private addItemToCart = (id: number) => {
    this.cartService.appendItemToCart({
      count: this.INITIAL_ITEM_COUNT,
      id,
    });
  };

  private removeItemFromCart = (id: number) => {
    this.cartService.removeItemFromCart(id);
  };

  toggleCartState = () => {
    asyncScheduler.schedule(() => {
      if (this.hasItemInCart) this.removeItemFromCart(this.itemId);
      else this.addItemToCart(this.itemId);

      this.changeDetectorRef.markForCheck();
    });
  };
}
