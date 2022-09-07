import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TuiIslandModule, TuiTagModule } from '@taiga-ui/kit';

import { AuthorModel, ProductModel } from '@book-store/shared/models';
import { TextOverflowPipe, ProductPricePipe } from '@shared/pipes';
import { AddableCartItem } from '@core/interfaces';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TuiIslandModule,
    TuiTagModule,
    TextOverflowPipe,
    ProductPricePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'product-card, [product-card]',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements AddableCartItem {
  @Input() product: ProductModel;

  get hasDiscount(): boolean {
    return (
      this.product.onSale &&
      !!this.product.discount &&
      !!this.product.discount.percent
    );
  }

  get productStyles() {
    return {
      background: `url(${this.product.book.picture})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };
  }

  get author(): AuthorModel {
    const [author] = this.product.book.authors;

    return author;
  }

  getId(): number {
    return this.product.id;
  }
}
