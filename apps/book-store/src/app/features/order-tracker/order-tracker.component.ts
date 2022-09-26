import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, tap, switchMap } from 'rxjs';

import { LoadingService, OrdersService } from '@core/services';
import { OrderModel } from '@book-store/shared';
import { OrderStateMessages, orderStateToText } from '@shared/values';

@Component({
  selector: 'order-tracker',
  templateUrl: './order-tracker.component.html',
  styleUrls: ['./order-tracker.component.scss'],
})
export class OrderTrackerComponent implements OnDestroy {
  private readonly subscriptions = new Subscription();

  displayText: {
    status?: string;
    deliveryPointAddress?: string;
    deliveryPointSchedule?: string;
    totalPrice?: number;
  } = {};

  constructor(
    private ordersService: OrdersService,
    private loadingService: LoadingService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private setTrackResult = (order: OrderModel) => {
    this.displayText = {
      status: orderStateToText(order.state),
      deliveryPointAddress: order.deliveryPoint.address,
      deliveryPointSchedule: order.deliveryPoint.schedule,
      totalPrice: order.totalPrice,
    };
  };

  private handleError = ({ status }: HttpErrorResponse) => {
    this.loadingService.setLoading(false);

    if (status === HttpStatusCode.NotFound) {
      this.displayText = {
        status: OrderStateMessages.NOT_NOUNT,
      };

      return;
    }

    this.displayText.status = OrderStateMessages.ERROR;
  };

  getOrderByTrack(track: string) {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.ordersService
        .getOrderByTrack(track)
        .pipe(tap(() => this.loadingService.setLoading(false)))
        .subscribe({
          next: this.setTrackResult,
          error: this.handleError,
        })
    );
  }
}
