import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Model, Discount } from '@book-store/shared';

@Component({
  selector: 'discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountListComponent {
  readonly columns = [
    'Название',
    'Описание',
    'Процент скидки',
    'Дата создания',
    'Действие',
  ] as const;

  @Input() discounts: Model<Discount>[] = [];

  @Output() deleteDiscount = new EventEmitter<number>();

  delete(id: number) {
    this.deleteDiscount.emit(id);
  }
}
