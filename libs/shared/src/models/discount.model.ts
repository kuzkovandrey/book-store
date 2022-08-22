import { Model } from './base.model';

export type Discount = {
  name: string;
  description: string;
  percent: number;
};

export type DiscountModel = Model<Discount>;
