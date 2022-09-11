import { ProductsApi } from '@core/api/products.api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '@book-store/shared/models';
import { ChangeProductValuesDto } from '@book-store/shared/dto';
import { ApiQueryParams } from '@book-store/shared/values';
import { SearchParams } from '@core/models';

@Injectable()
export class ProductsService {
  constructor(private productsApi: ProductsApi) {}

  getAll(): Observable<ProductModel[]> {
    return this.productsApi.getAll();
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.productsApi.getProductById(id);
  }

  changeValues(
    id: number,
    changes: ChangeProductValuesDto
  ): Observable<ProductModel> {
    return this.productsApi.changeValues(id, changes);
  }

  getSimilarById(id: number, count = 6): Observable<ProductModel[]> {
    return this.productsApi.getSimilarById(id, count);
  }

  search({
    text = '',
    pageOptions = { page: 1, perPage: 25 },
    filters = {},
  }: SearchParams): Observable<ProductModel[]> {
    return this.productsApi.search({
      ...(text ? { [ApiQueryParams.TEXT]: text } : {}),
      ...pageOptions,
      ...filters,
    });
  }

  deleteProductById(id: number): Observable<ProductModel> {
    return this.productsApi.deleteProductById(id);
  }
}
