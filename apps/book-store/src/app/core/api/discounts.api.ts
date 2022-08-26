import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateDiscountDto,
  DiscountModel,
  ApiControlles,
  AddDiscountDto,
  ProductModel,
} from '@book-store/shared';

@Injectable()
export class DiscountsApi {
  constructor(private http: HttpClient) {}

  getAll(): Observable<DiscountModel[]> {
    return this.http.get<DiscountModel[]>(ApiControlles.DISCOUNTS);
  }

  createDiscount(discount: CreateDiscountDto): Observable<DiscountModel> {
    return this.http.post<DiscountModel>(ApiControlles.DISCOUNTS, discount);
  }

  deleteDiscount(id: number): Observable<DiscountModel> {
    return this.http.delete<DiscountModel>(`${ApiControlles.DISCOUNTS}/${id}`);
  }

  addDiscountToProduct(dto: AddDiscountDto): Observable<ProductModel> {
    return this.http.post<ProductModel>(
      `${ApiControlles.DISCOUNTS}/${ApiControlles.ADD}`,
      dto
    );
  }
}
