import { Product } from '../models';

export type ChangeProductValuesDto = Omit<Product, 'discount' | 'book'>;
