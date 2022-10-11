import { ApiGateway } from '@core/api/api.gateway';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateDiscountDto,
  DiscountModel,
  ApiControlles,
  AddDiscountDto,
  ProductModel,
} from '@book-store/shared';

@Injectable({
  providedIn: 'root',
})
export class ProductDiscountsApi {
  constructor(private api: ApiGateway) {}

  getAll(): Observable<DiscountModel[]> {
    return this.api.get<DiscountModel[]>({
      url: ApiControlles.DISCOUNTS,
    });
  }

  createDiscount(discount: CreateDiscountDto): Observable<DiscountModel> {
    return this.api.post<DiscountModel>({
      url: ApiControlles.DISCOUNTS,
      body: discount,
    });
  }

  deleteDiscount(id: number): Observable<DiscountModel> {
    return this.api.delete<DiscountModel>({
      url: `${ApiControlles.DISCOUNTS}/${id}`,
    });
  }

  addDiscountToProduct(dto: AddDiscountDto): Observable<ProductModel> {
    return this.api.post<ProductModel>({
      url: `${ApiControlles.DISCOUNTS}/${ApiControlles.ADD}`,
      body: dto,
    });
  }
}
