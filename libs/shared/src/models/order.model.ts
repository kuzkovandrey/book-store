import { OrderState } from '../values';
import { Model } from './base.model';
import { BuyerModel } from './buyer.model';
import { DeliveryModel } from './delivery.model';
import { ProductModel } from './product.model';

export type OrderItem = {
  count: number;
  product: ProductModel;
};

export type OrderItemModel = Model<OrderItem>;

export type Order = {
  buyer: BuyerModel;
  deliveryPoint: DeliveryModel;
  totalPrice: number;
  state: OrderState;
  orderItems: OrderItemModel[];
};

export type OrderModel = Model<Order>;
