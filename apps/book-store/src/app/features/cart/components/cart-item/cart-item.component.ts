import { TuiTextfieldControllerModule, TuiButtonModule } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TuiInputCountModule, TuiInputModule } from '@taiga-ui/kit';

import { TextOverflowPipe } from '@shared/pipes';
import { CartItemCountChangeEvent, CartItem } from '@features/cart/types';
import { BookModel, ProductModel } from '@book-store/shared/models';
import { ProductPricePipe } from '@features/product';
import { getAuthorList } from '@shared/utils';

@Component({
  selector: 'cart-item, [cart-item]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputCountModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiInputModule,
    TextOverflowPipe,
    ProductPricePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent implements OnInit, OnDestroy {
  @Input() cartItem: CartItem;

  @Output() deleteItem = new EventEmitter<number>();

  @Output() productPictureClick = new EventEmitter<number>();

  @Output() countChanges = new EventEmitter<CartItemCountChangeEvent>();

  private readonly subscriptions = new Subscription();

  get book(): BookModel {
    return this.cartItem.product.book;
  }

  get product(): ProductModel {
    return this.cartItem.product;
  }

  get itemCount(): number {
    return this.countControl.value as number;
  }

  authors: string;

  countControl = new FormControl<number>(1);

  ngOnInit(): void {
    this.countControl.setValue(this.cartItem.count);

    this.subscriptions.add(
      this.countControl.valueChanges.subscribe((count) => {
        if (!count) return;

        this.countChanges.emit({
          id: this.product.id,
          count,
        });
      })
    );

    this.authors = getAuthorList(this.book);
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
