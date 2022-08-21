import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { Model, Product } from '@book-store/shared/models';
import { ProductSaleStates } from '@features/admin-panel/values';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input() products: Model<Product>[];

  @Output() editButtonClicked = new EventEmitter<Model<Product>>();

  @Output() deleteButtonClicked = new EventEmitter<Model<Product>>();

  @Output() discountClicked = new EventEmitter<Model<Product>>();

  productSaleStates = ProductSaleStates;

  readonly columns = [
    'id',
    'Обложка',
    'Дата создания',
    'Название',
    'Статус',
    'Количество',
    'Цена',
    'Программа скидок',
    'Действия',
  ] as const;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  deleteProduct(product: Model<Product>) {
    this.deleteButtonClicked.emit(product);
  }

  editProduct(product: Model<Product>) {
    this.editButtonClicked.emit(product);
  }

  updateView() {
    this.changeDetectorRef.markForCheck();
  }

  changeDiscount(product: Model<Product>) {
    this.discountClicked.emit(product);
  }
}
