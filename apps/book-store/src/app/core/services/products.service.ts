import { ProductsApi } from '@core/api/products.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '@book-store/shared/models';
import { ChangeProductValuesDto } from '@book-store/shared/dto';

@Injectable()
export class ProductsService {
  constructor(private productsApi: ProductsApi) {}

  getAll(): Observable<ProductModel[]> {
    return this.productsApi.getAll();
  }

  changeValues(
    id: number,
    changes: ChangeProductValuesDto
  ): Observable<ProductModel> {
    return this.productsApi.changeValues(id, changes);
  }
}
