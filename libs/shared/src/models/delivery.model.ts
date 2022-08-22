import { Model } from './base.model';

export type Delivery = {
  address: string;
  schedule: string;
  isActive: boolean;
};

export type DeliveryModel = Model<Delivery>;
