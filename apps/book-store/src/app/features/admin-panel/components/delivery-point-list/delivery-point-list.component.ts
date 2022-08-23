import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeliveryModel } from '@book-store/shared/models';

@Component({
  selector: 'delivery-point-list',
  templateUrl: './delivery-point-list.component.html',
  styleUrls: ['./delivery-point-list.component.scss'],
})
export class DeliveryPointListComponent {
  @Input() deliveryList: DeliveryModel[] = [];

  @Output() deleteButtonClicked = new EventEmitter<number>();

  @Output() editButtonClicked = new EventEmitter<DeliveryModel>();

  readonly columns = [
    'id',
    'Адрес',
    'График работы',
    'Статус работы',
    'Дата создания',
    'Действие',
  ] as const;

  deleteDelivery(id: number) {
    this.deleteButtonClicked.emit(id);
  }

  editDeliveryPoint(delivery: DeliveryModel) {
    this.editButtonClicked.emit(delivery);
  }
}
