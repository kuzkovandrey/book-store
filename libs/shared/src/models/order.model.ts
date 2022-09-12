import { OrderState } from '../values';
import { Model } from './base.model';
import { BuyerModel } from './buyer.model';
import { DeliveryModel } from './delivery.model';

export type OrderItem = {
  count: number;
  productId: number;
};

export type OrderItemModel = Model<OrderItem>;

export type Order = {
  buyer: BuyerModel;
  deliveryPoint: DeliveryModel;
  totalPrice: number;
  state: OrderState;
  orderItems: OrderItemModel[];
  tracker: string;
};

export type OrderModel = Model<Order>;

export type SuccessCreateOrder = {
  id: number;
  tracker: string;
};

export type OrderStatus = {
  id: number;
  state: OrderState;
};
