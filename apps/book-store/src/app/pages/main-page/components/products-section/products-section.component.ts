import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { ProductModel } from '@book-store/shared/models';

@Component({
  selector: 'products-section, [products-section]',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsSectionComponent {
  @Input() title: string;

  @Input() products: ProductModel[];

  @Output() categoryClick = new EventEmitter<void>();

  @Output() productCardClick = new EventEmitter<number>();

  onClickCategory() {
    this.categoryClick.emit();
  }

  onClickProductCard(id: number) {
    this.productCardClick.emit(id);
  }
}
