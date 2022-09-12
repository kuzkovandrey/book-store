import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';

@Component({
  selector: 'order-success-modal',
  templateUrl: './order-success-modal.component.html',
  styleUrls: ['./order-success-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSuccessModalComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext
  ) {}

  onButtonClick() {
    this.context.completeWith();
  }
}
