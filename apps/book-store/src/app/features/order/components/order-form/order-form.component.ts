import { filter, map, Subscription } from 'rxjs';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TuiStringHandler } from '@taiga-ui/cdk';
import {
  TuiInputCountModule,
  tuiItemsHandlersProvider,
  TuiInputModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
} from '@taiga-ui/kit';

import { DeliveryModel } from '@book-store/shared/models';

import { OrderFormModel } from '@features/order/types';
import { CommonModule } from '@angular/common';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';

const STRINGIFY_DELIVERY_POINT: TuiStringHandler<DeliveryModel> = ({
  address,
}: DeliveryModel) => `${address}`;

@Component({
  selector: 'order-form, [order-form]',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputCountModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiInputModule,
    TuiDataListModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
  ],
  providers: [
    tuiItemsHandlersProvider({ stringify: STRINGIFY_DELIVERY_POINT }),
  ],
})
export class OrderFormComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  @Input() deliveryPointList: DeliveryModel[] = [];

  @Output() formValueChanges = new EventEmitter<OrderFormModel>();

  @Output() orderButtonClicked = new EventEmitter<void>();

  orderForm: FormGroup;

  ngOnInit() {
    this.initForm();

    this.subscriptions.add(
      this.orderForm.valueChanges
        .pipe(filter(() => this.orderForm.valid))
        .subscribe(({ buyer, deliveryPoint }) => {
          this.formValueChanges.emit({
            buyer,
            deliveryPointId: deliveryPoint.id,
          });
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private initForm() {
    this.orderForm = new FormGroup({
      buyer: new FormGroup({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
      }),
      deliveryPoint: new FormControl(null, [Validators.required]),
    });
  }

  onClickOrderButton() {
    this.orderButtonClicked.emit();
  }
}
