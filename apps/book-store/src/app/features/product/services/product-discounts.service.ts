import { ProductDiscountsApi } from '../api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DiscountModel,
  ProductModel,
  CreateDiscountDto,
  AddDiscountDto,
} from '@book-store/shared';

@Injectable({
  providedIn: 'root',
})
export class ProductDiscountsService {
  constructor(private discountsApi: ProductDiscountsApi) {}

  getAll(): Observable<DiscountModel[]> {
    return this.discountsApi.getAll();
  }

  createDiscount(discount: CreateDiscountDto): Observable<DiscountModel> {
    return this.discountsApi.createDiscount(discount);
  }

  deleteDiscount(id: number): Observable<DiscountModel> {
    return this.discountsApi.deleteDiscount(id);
  }

  addDiscountToProduct(dto: AddDiscountDto): Observable<ProductModel> {
    return this.discountsApi.addDiscountToProduct(dto);
  }
}
