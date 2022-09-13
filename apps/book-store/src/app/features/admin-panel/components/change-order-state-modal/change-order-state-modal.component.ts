import { FormControl } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { TuiDialogContext } from '@taiga-ui/core';

import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { OrderState } from '@book-store/shared/values';
import { orderStateToText } from '@shared/values';

const STRINGIFY_STATE: TuiStringHandler<OrderState> = (
  state: OrderState
): string => orderStateToText(state);

@Component({
  selector: 'change-order-state-modal',
  templateUrl: './change-order-state-modal.component.html',
  styleUrls: ['./change-order-state-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiItemsHandlersProvider({
      stringify: STRINGIFY_STATE,
    }),
  ],
})
export class ChangeOrderStateModalComponent {
  orderStateControl = new FormControl();

  readonly orderStates = Object.values(OrderState);

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<
      { newState: OrderState },
      { orderId: number; state: OrderState }
    >
  ) {
    this.orderStateControl.setValue(context.data.state);
  }

  changeState() {
    this.context.completeWith({ newState: this.orderStateControl.value });
  }
}
