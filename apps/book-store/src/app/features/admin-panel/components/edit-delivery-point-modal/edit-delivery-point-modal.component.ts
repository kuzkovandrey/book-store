import { Component, Inject } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';

import { DeliveryForm } from '@features/admin-panel/types';

@Component({
  selector: 'edit-delivery-point-modal',
  templateUrl: './edit-delivery-point-modal.component.html',
  styleUrls: ['./edit-delivery-point-modal.component.scss'],
})
export class EditDeliveryPointModalComponent {
  form: DeliveryForm;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialogContext<DeliveryForm, { form: DeliveryForm }>
  ) {
    this.form = this.context.data.form;
  }

  onClickEditButton(delivery: DeliveryForm) {
    this.context.completeWith(delivery);
  }
}
