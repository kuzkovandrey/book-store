import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Subject, Subscription, tap, switchMap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';

import {
  OrderState,
  ChangeOrderStateDto,
  OrderModel,
} from '@book-store/shared';
import { ChangeOrderStateModalComponent } from '@features/admin-panel/components';
import { OrdersService, AlertService, LoadingService } from '@core/services';
import { CommonErrorMessages } from '@core/values';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private readonly changeOrderState$ = new Subject<ChangeOrderStateDto>();

  orderList: OrderModel[];

  readonly tableColumns = [
    'id',
    'Трекер',
    'Статус заказа',
    'Сумма заказа, руб',
    'Пункт выдачи',
    'Покупатель',
  ] as const;

  constructor(
    private ordersService: OrdersService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private dialogService: TuiDialogService
  ) {}

  ngOnInit() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.ordersService
        .getAllOrders()
        .pipe(tap(() => this.loadingService.setLoading(false)))
        .subscribe({
          next: this.setOrderList,
          error: this.handleError,
        })
    );

    this.subscriptions.add(
      this.changeOrderState$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap(({ state, orderId }) =>
            this.ordersService.changeState(orderId, state)
          ),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.handleChangeOrderState,
          error: this.handleError,
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private handleChangeOrderState = ({ state, id: orderId }: OrderModel) => {
    const order = this.orderList.find(({ id }) => id === orderId);

    if (!order) throw new Error('handleChangeOrderState');

    order.state = state;
  };

  openChangeOrderStateModal(orderId: number, state: OrderState) {
    this.subscriptions.add(
      this.dialogService
        .open<{ newState: OrderState }>(
          new PolymorpheusComponent(ChangeOrderStateModalComponent),
          {
            data: {
              orderId,
              state,
            },
          }
        )
        .subscribe(({ newState: state }) => {
          this.changeOrderState$.next({
            orderId,
            state,
          });
        })
    );
  }

  private setOrderList = (orderList: OrderModel[]) => {
    this.orderList = orderList;
  };

  private handleError = () => {
    this.loadingService.setLoading(false);
    this.alertService.showError(CommonErrorMessages.UPLOAD_ERROR);
  };
}
