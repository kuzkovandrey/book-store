import { Inject, Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable()
export class AlertService {
  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  showError(message: string) {
    this.alertService
      .open(message, { status: TuiNotification.Error })
      .subscribe();
  }

  showSuccess(message: string) {
    this.alertService
      .open(message, { status: TuiNotification.Success })
      .subscribe();
  }
}
