import { ProductModel } from '@book-store/shared/models';

export type ProductCategorySection = {
  id: number;
  title: string;
  products: ProductModel[];
};
