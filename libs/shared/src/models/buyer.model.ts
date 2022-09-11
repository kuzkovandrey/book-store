import { Model } from './base.model';

export type Buyer = {
  firstName: string;
  email: string;
};

export type BuyerModel = Model<Buyer>;
