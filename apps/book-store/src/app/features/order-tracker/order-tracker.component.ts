import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, tap, switchMap } from 'rxjs';

import { LoadingService, OrdersService } from '@core/services';
import { OrderState, OrderModel } from '@book-store/shared';
import { TrackMessages } from './values';

@Component({
  selector: 'order-tracker',
  templateUrl: './order-tracker.component.html',
  styleUrls: ['./order-tracker.component.scss'],
})
export class OrderTrackerComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private readonly getOrderByTrack$ = new Subject<string>();

  private readonly statusTexts = {
    [OrderState.PROCESS]: TrackMessages.PROCESS,
    [OrderState.SHIPMENT]: TrackMessages.SHIPMENT,
    [OrderState.DELIVERY]: TrackMessages.DELIVERY,
    [OrderState.DELIVERED]: TrackMessages.DELIVERED,
  };

  displayText: {
    status: string;
    deliveryPointAddress: string;
    deliveryPointSchedule: string;
    totalPrice: number;
  };

  constructor(
    private ordersService: OrdersService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.getOrderByTrack$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap((track) => this.ordersService.getOrderByTrack(track)),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.setTrackResult,
          error: this.handleError,
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private setTrackResult = (order: OrderModel) => {
    console.log(order);

    this.displayText = {
      status: this.statusTexts[order.state],
      deliveryPointAddress: order.deliveryPoint.address,
      deliveryPointSchedule: order.deliveryPoint.schedule,
      totalPrice: order.totalPrice,
    };
  };

  private handleError = ({ status }: HttpErrorResponse) => {
    this.loadingService.setLoading(false);

    if (status === HttpStatusCode.NotFound) {
      this.displayText.status = TrackMessages.NOT_NOUNT;
      return;
    }

    this.displayText.status = TrackMessages.ERROR;
  };

  getOrderByTrack(track: string) {
    this.getOrderByTrack$.next(track);
  }
}
