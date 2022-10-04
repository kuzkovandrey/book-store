import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DeliveryForm } from 'src/app/pages/admin-panel/types';

@Component({
  selector: 'create-delivery-form',
  templateUrl: './create-delivery-form.component.html',
  styleUrls: ['./create-delivery-form.component.scss'],
})
export class CreateDeliveryFormComponent implements OnInit {
  private readonly subscriptions = new Subscription();

  @Output() creationButtonClicked = new EventEmitter<DeliveryForm>();

  @Input() initialState: DeliveryForm;

  @Input() buttonText: 'Создать' | 'Изменить' = 'Создать';

  deliveryForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  resetForm() {
    this.deliveryForm.reset();
    this.deliveryForm.markAsUntouched();
  }

  private initForm() {
    this.deliveryForm = new FormGroup({
      address: new FormControl(this.initialState?.address ?? '', [
        Validators.required,
      ]),
      schedule: new FormGroup({
        from: new FormControl(this.initialState?.schedule?.from ?? '', [
          Validators.required,
        ]),
        to: new FormControl(this.initialState?.schedule?.to ?? '', [
          Validators.required,
        ]),
        days: new FormControl(this.initialState?.schedule?.days ?? '', [
          Validators.required,
        ]),
      }),
      isActive: new FormControl(this.initialState?.isActive ?? false),
    });
  }

  onClickCreationButton() {
    this.creationButtonClicked.emit(this.deliveryForm.value);
  }
}
