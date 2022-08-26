import { Model } from './base.model';
import { BookModel } from './book.model';
import { CategoryModel } from './category.model';
import { DiscountModel } from './discount.model';

export type Product = {
  totalCount: number;
  onSale: boolean;
  cost: number;
  discount?: DiscountModel;
  book: BookModel;
  category?: CategoryModel;
};

export type ProductModel = Model<Product>;
