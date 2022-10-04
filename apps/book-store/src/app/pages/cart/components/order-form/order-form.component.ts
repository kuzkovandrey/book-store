import { filter, map, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { tuiItemsHandlersProvider } from '@taiga-ui/kit';

import { DeliveryModel } from '@book-store/shared/models';

import { OrderFormModel } from 'src/app/pages/cart/models';
import { DeliveryService } from '@features/delivery';

const STRINGIFY_DELIVERY_POINT: TuiStringHandler<DeliveryModel> = ({
  address,
}: DeliveryModel) => `${address}`;

@Component({
  selector: 'order-form, [order-form]',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  providers: [
    tuiItemsHandlersProvider({ stringify: STRINGIFY_DELIVERY_POINT }),
  ],
})
export class OrderFormComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  @Output() formValueChanges = new EventEmitter<OrderFormModel>();

  @Output() orderButtonClicked = new EventEmitter<void>();

  orderForm: FormGroup;

  deliveryPointList: DeliveryModel[];

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit() {
    this.initForm();

    this.subscriptions.add(
      this.deliveryService
        .getAllDeliveryPoints()
        .pipe(map((pointList) => pointList.filter(({ isActive }) => isActive)))
        .subscribe({
          next: (deliveryPointList) => {
            this.deliveryPointList = deliveryPointList;
          },
          error: () => {
            this.deliveryPointList = [];
          },
        })
    );

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
