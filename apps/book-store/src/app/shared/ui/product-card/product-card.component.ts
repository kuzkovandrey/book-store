import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '@book-store/shared/models';
import { TextOverflowPipe } from '@shared/pipes';
import { TuiIslandModule, TuiTagModule } from '@taiga-ui/kit';

@Component({
  standalone: true,
  imports: [CommonModule, TuiIslandModule, TuiTagModule, TextOverflowPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'product-card, [product-card]',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: Product;

  get status() {
    if (this.hasDiscount && this.product.onSale) return 'error';

    return this.product.onSale ? 'success' : 'warning';
  }

  get price() {
    return this.product.onSale
      ? `${this.calculatePrice()} руб.`
      : 'Скоро в продаже';
  }

  get hasDiscount(): boolean {
    return !!this.product.discount && !!this.product.discount.percent;
  }

  get productStyles() {
    return {
      background: `url(${this.product.book.picture})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };
  }

  private calculatePrice(): number {
    if (this.product.discount && this.product.discount.percent) {
      const cost = this.product.cost * (this.product?.discount.percent / 100);

      return Math.round(cost * 100) / 100;
    }

    return Math.round(this.product.cost * 100) / 100;
  }
}
