import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { BookModel } from '@book-store/shared/models';
import { CartItem } from '@features/cart/models/cart.model';

@Component({
  selector: 'cart-item, [cart-item]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent implements OnInit, OnDestroy {
  @Input() cartItem: CartItem;

  @Output() deleteItem = new EventEmitter<number>();

  @Output() countChanges = new EventEmitter<[number, number]>();

  private readonly subscriptions = new Subscription();

  productFormControl = new FormControl(1);

  get book(): BookModel {
    return this.cartItem.product.book;
  }

  ngOnInit(): void {
    this.productFormControl.setValue(this.cartItem.count);

    this.subscriptions.add(
      this.productFormControl.valueChanges.subscribe((count) => {
        this.countChanges.emit([this.cartItem.product.id, count as number]);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onClickDelete(id: number) {
    this.deleteItem.emit(id);
  }
}
