export interface AddableCartItem {
  getId(): number;

  onSale(): boolean;
}
