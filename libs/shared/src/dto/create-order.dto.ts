import { Buyer } from '../models';

export interface ProductItem {
  productId: number;
  count: number;
}

export interface CreateOrderDto {
  buyer: Buyer;
  deliveryPointId: number;
  productList: ProductItem[];
  totalPrice: number;
}
