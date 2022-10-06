export type CartState = 'in' | 'out';

export type CartWrapperItem = {
  id: number;
  onSale: number;
};
export interface StorageCartItem {
  id: number;
  count: number;
}
