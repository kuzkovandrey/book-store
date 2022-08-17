import { Model } from './base.model';
import { Book } from './book.model';
import { Discount } from './discount.model';

export interface Product {
  totalCount: number;
  onSale: boolean;
  cost: number;
  discount: Discount;
  book: Model<Book>;
}
