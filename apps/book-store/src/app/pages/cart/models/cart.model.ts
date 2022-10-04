import { ProductModel } from '@book-store/shared/models';

export interface StorageCartItem {
  productId: number;
  count: number;
}

export type StorageCartList = StorageCartItem[];

export interface CartItem {
  product: ProductModel;
  count: number;
}

export type CartList = CartItem[];
