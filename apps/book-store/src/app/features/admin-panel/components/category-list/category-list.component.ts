import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CategoryModel } from '@book-store/shared';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  @Input() categoryList: CategoryModel[] = [];

  readonly columns = ['Название', 'Дата создания', 'Действие'] as const;

  @Output() deleteCategory = new EventEmitter<number>();

  @Output() changeCategory = new EventEmitter<CategoryModel>();

  onClickDelete(id: number) {
    this.deleteCategory.emit(id);
  }

  onClickEdit(category: CategoryModel) {
    this.changeCategory.emit(category);
  }
}
