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

import { BookModel, ProductModel } from '@book-store/shared/models';
import { CartItem } from 'src/app/pages/cart/models/cart.model';

@Component({
  selector: 'cart-item, [cart-item]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent implements OnInit, OnDestroy {
  @Input() cartItem: CartItem;

  @Input() count: number;

  @Output() deleteItem = new EventEmitter<number>();

  @Output() productPictureClick = new EventEmitter<number>();

  @Output() countChanges = new EventEmitter<[number, number]>();

  private readonly subscriptions = new Subscription();

  productFormControl = new FormControl<number>(1);

  get book(): BookModel {
    return this.cartItem.product.book;
  }

  get product(): ProductModel {
    return this.cartItem.product;
  }

  get itemCount(): number {
    return this.productFormControl.value ?? 1;
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

  onClickProductPicture() {
    this.productPictureClick.emit(this.product.id);
  }
}
