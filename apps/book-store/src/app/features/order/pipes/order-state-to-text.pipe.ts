import { Pipe, PipeTransform } from '@angular/core';

import { OrderState } from '@book-store/shared/values';
import { OrderStateMessages, orderStateToText } from '@features/order/utils';

@Pipe({
  name: 'orderStateToText',
  standalone: true,
})
export class OrderStateToTextPipe implements PipeTransform {
  transform(state: OrderState): OrderStateMessages {
    return orderStateToText(state) ?? ('' as OrderStateMessages);
  }
}
