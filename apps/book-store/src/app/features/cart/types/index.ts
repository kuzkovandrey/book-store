import { ProductModel } from '@book-store/shared/models';

export type CartState = 'in' | 'out';

export type CartWrapperItem = {
  id: number;
  onSale: number;
};
export interface StorageCartItem {
  id: number;
  count: number;
}

export type CartItem = {
  product: ProductModel;
  count: number;
};

export type CartList = CartItem[];

export type CartItemCountChangeEvent = {
  id: number;
  count: number;
};
