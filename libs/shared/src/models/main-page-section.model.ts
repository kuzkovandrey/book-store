import { CategoryModel } from './category.model';
import { ProductModel } from './product.model';

export type MainPageSection = {
  category?: CategoryModel;
  productList: ProductModel[];
};
