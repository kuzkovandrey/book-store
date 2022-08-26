import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { Model, Product, ProductModel } from '@book-store/shared/models';
import { ProductSaleStates } from '@features/admin-panel/values';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input() products: ProductModel[];

  @Output() editButtonClicked = new EventEmitter<ProductModel>();

  @Output() deleteButtonClicked = new EventEmitter<ProductModel>();

  @Output() discountClicked = new EventEmitter<ProductModel>();

  @Output() changeCategoryClicked = new EventEmitter<ProductModel>();

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
    'Категория',
    'Действия',
  ] as const;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  deleteProduct(product: ProductModel) {
    this.deleteButtonClicked.emit(product);
  }

  editProduct(product: ProductModel) {
    this.editButtonClicked.emit(product);
  }

  updateView() {
    this.changeDetectorRef.markForCheck();
  }

  changeDiscount(product: ProductModel) {
    this.discountClicked.emit(product);
  }

  changeCategory(product: ProductModel) {
    this.changeCategoryClicked.emit(product);
  }
}
