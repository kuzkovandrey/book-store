import { OrderState } from '@book-store/shared/values';

export enum OrderStateMessages {
  NOT_NOUNT = 'Такой заказ не найден, проверьте введенные данные.',
  ERROR = 'Произошла ошибка. Повторите, пожалуйста, позже.',
  PROCESS = 'Заказ в процессе формирования.',
  SHIPMENT = 'Заказ передан в службу отгрузки товара.',
  DELIVERY = 'Заказ передан в службу доставки.',
  DELIVERED = 'Заказ ожидает в пункте выдачи товара.',
}

export const orderStateToText = (state: OrderState) => {
  return {
    [OrderState.PROCESS]: OrderStateMessages.PROCESS,
    [OrderState.SHIPMENT]: OrderStateMessages.SHIPMENT,
    [OrderState.DELIVERY]: OrderStateMessages.DELIVERY,
    [OrderState.DELIVERED]: OrderStateMessages.DELIVERED,
  }[state];
};
