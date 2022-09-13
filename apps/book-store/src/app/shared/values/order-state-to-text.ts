import { OrderState } from '@book-store/shared/values';
import { OrderStateMessages } from './order-state-messages.enum';

export const orderStateToText = (state: OrderState) => {
  return {
    [OrderState.PROCESS]: OrderStateMessages.PROCESS,
    [OrderState.SHIPMENT]: OrderStateMessages.SHIPMENT,
    [OrderState.DELIVERY]: OrderStateMessages.DELIVERY,
    [OrderState.DELIVERED]: OrderStateMessages.DELIVERED,
  }[state];
};
