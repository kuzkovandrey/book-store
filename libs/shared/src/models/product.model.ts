import { Model } from './base.model';
import { BookModel } from './book.model';
import { DiscountModel } from './discount.model';

export type Product = {
  totalCount: number;
  onSale: boolean;
  cost: number;
  discount: DiscountModel;
  book: BookModel;
};

export type ProductModel = Model<Product>;
