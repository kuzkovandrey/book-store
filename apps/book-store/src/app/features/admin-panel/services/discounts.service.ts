import { DiscountsApi } from '@core/api/discounts.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Model,
  Discount,
  Product,
  CreateDiscountDto,
  AddDiscountDto,
} from '@book-store/shared';

@Injectable()
export class DiscountsService {
  constructor(private discountsApi: DiscountsApi) {}

  getAll(): Observable<Model<Discount>[]> {
    return this.discountsApi.getAll();
  }

  createDiscount(discount: CreateDiscountDto): Observable<Model<Discount>> {
    return this.discountsApi.createDiscount(discount);
  }

  deleteDiscount(id: number): Observable<Model<Discount>> {
    return this.discountsApi.deleteDiscount(id);
  }

  addDiscountToProduct(dto: AddDiscountDto): Observable<Model<Product>> {
    return this.discountsApi.addDiscountToProduct(dto);
  }
}
