import { Buyer } from '../models';

export interface CreateOrderDto {
  buyer: Buyer;
  deliveryPointId: number;
  productList: {
    productId: number;
    count: number;
  }[];
  totalPrice: number;
}
