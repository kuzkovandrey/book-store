import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription, tap, switchMap, map } from 'rxjs';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogService } from '@taiga-ui/core';

import { CommonErrorMessages } from '@core/values';
import { AlertService, DeliveryService, LoadingService } from '@core/services';
import { DeliveryModel, CreateDeliveryPointDto } from '@book-store/shared';
import { DeliveryForm } from '@features/admin-panel/types';
import {
  CreateDeliveryFormComponent,
  EditDeliveryPointModalComponent,
} from '@features/admin-panel/components';
import { ErrorMessages } from '@features/admin-panel/values';

@Component({
  selector: 'delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private createDelivery$ = new Subject<DeliveryForm>();

  private fetchAllDeliveryPoints$ = new Subject<void>();

  private editDeliveryPoint$ = new Subject<[DeliveryForm, number]>();

  private deleteDeliveryPoint$ = new Subject<number>();

  @ViewChild(CreateDeliveryFormComponent, { read: CreateDeliveryFormComponent })
  private deliveryForm: CreateDeliveryFormComponent;

  deliveryPointList: DeliveryModel[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    @Inject(TuiDialogService)
    private dialogService: TuiDialogService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.fetchAllDeliveryPoints$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap(() => this.deliveryService.getAllDeliveryPoints()),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: (deliveryPointList) =>
            (this.deliveryPointList = deliveryPointList),
          error: this.handleFetchDataError,
        })
    );

    this.subscriptions.add(
      this.editDeliveryPoint$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          map(([form, id]) => ({ dto: this.prepareFormToDto(form), id })),
          switchMap(({ dto, id }) =>
            this.deliveryService.changeDeliveryPointValues(id, dto)
          ),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.fetchAllDeliveryPoints,
          error: this.handleFetchDataError,
        })
    );

    this.subscriptions.add(
      this.deleteDeliveryPoint$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap((id) => this.deliveryService.deleteDeliveryPoint(id)),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.fetchAllDeliveryPoints,
          error: this.handleFetchDataError,
        })
    );

    this.subscriptions.add(
      this.createDelivery$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          map(this.prepareFormToDto),
          switchMap((dto) => this.deliveryService.createDeliveryPoint(dto)),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: () => {
            this.fetchAllDeliveryPoints();
            this.deliveryForm.resetForm();
          },
          error: this.handleCreationDeliveryError,
        })
    );

    this.fetchAllDeliveryPoints();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createDeliveryPoint(form: DeliveryForm) {
    this.createDelivery$.next(form);
  }

  private handleCreationDeliveryError = () => {
    this.loadingService.setLoading(false);
    this.alertService.showError(ErrorMessages.CREATE_DELIVERY);
  };

  private handleFetchDataError = () => {
    this.loadingService.setLoading(false);
    this.alertService.showError(CommonErrorMessages.UPLOAD_ERROR);
  };

  private fetchAllDeliveryPoints = () => {
    this.fetchAllDeliveryPoints$.next();
  };

  private prepareFormScheduleTime({ schedule }: DeliveryForm): string {
    return `${schedule.from} - ${schedule.to} - ${schedule.days}`;
  }

  private getSeparatedSchedule(schedule: string): [string, string, string] {
    const [from, to, days] = schedule.split(' - ');

    return [from, to, days];
  }

  private modelToDeliveryForm = ({
    isActive,
    schedule,
    address,
  }: DeliveryModel): DeliveryForm => {
    const [from, to, days] = this.getSeparatedSchedule(schedule);

    return {
      isActive,
      address,
      schedule: {
        from,
        to,
        days,
      },
    };
  };

  private prepareFormToDto = (form: DeliveryForm): CreateDeliveryPointDto => {
    const { isActive, address } = form;

    return {
      isActive,
      address,
      schedule: this.prepareFormScheduleTime(form),
    };
  };

  openEditModal(delivery: DeliveryModel) {
    this.dialogService
      .open<DeliveryForm>(
        new PolymorpheusComponent(EditDeliveryPointModalComponent),
        {
          data: {
            form: this.modelToDeliveryForm(delivery),
          },
        }
      )
      .subscribe((changes) => {
        this.editDeliveryPoint$.next([changes, delivery.id]);
      });
  }

  deleteDeliveryPoint(id: number) {
    this.deleteDeliveryPoint$.next(id);
  }
}
