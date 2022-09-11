import { OrderState } from '../values';

export interface ChangeOrderStateDto {
  orderId: number;
  state: OrderState;
}
