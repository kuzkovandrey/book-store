import { OrderState } from '@book-store/shared/values';

export const orderStateText = {
  [OrderState.PROCESS]: 'Формирование заказа',
  [OrderState.SHIPMENT]: 'Отгрузка',
  [OrderState.DELIVERY]: 'В доставке',
  [OrderState.DELIVERED]: 'Доставлено на пункт выдачи',
};
