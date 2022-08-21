import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateDiscountDto,
  Model,
  Discount,
  ApiControlles,
  AddDiscountDto,
  Product,
} from '@book-store/shared';

@Injectable()
export class DiscountsApi {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Model<Discount>[]> {
    return this.http.get<Model<Discount>[]>(ApiControlles.DISCOUNTS);
  }

  createDiscount(discount: CreateDiscountDto): Observable<Model<Discount>> {
    return this.http.post<Model<Discount>>(ApiControlles.DISCOUNTS, discount);
  }

  deleteDiscount(id: number): Observable<Model<Discount>> {
    return this.http.delete<Model<Discount>>(
      `${ApiControlles.DISCOUNTS}/${id}`
    );
  }

  addDiscountToProduct(dto: AddDiscountDto): Observable<Model<Product>> {
    return this.http.post<Model<Product>>(
      `${ApiControlles.DISCOUNTS}/${ApiControlles.ADD}`,
      dto
    );
  }
}
