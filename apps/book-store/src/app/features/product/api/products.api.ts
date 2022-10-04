import { ApiGateway } from '@core/api/api.gateway';
import { ApiControlles, ApiQueryParams } from '@book-store/shared/values';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel, SearchQueryParams } from '@book-store/shared/models';
import { ChangeProductValuesDto } from '@book-store/shared/dto';

@Injectable({
  providedIn: 'root',
})
export class ProductsApi {
  constructor(private api: ApiGateway) {}

  getAll(): Observable<ProductModel[]> {
    return this.api.get<ProductModel[]>({
      url: ApiControlles.PRODUCTS,
    });
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.api.get<ProductModel>({
      url: `${ApiControlles.PRODUCTS}/${id}`,
    });
  }

  changeValues(
    id: number,
    changes: ChangeProductValuesDto
  ): Observable<ProductModel> {
    return this.api.patch<ProductModel>({
      url: `${ApiControlles.PRODUCTS}/${id}`,
      body: changes,
    });
  }

  getSimilarById(id: number, count: number) {
    return this.api.get<ProductModel[]>({
      url: `${ApiControlles.PRODUCTS}${ApiControlles.SIMILAR}`,
      params: {
        [ApiQueryParams.ID]: id,
        [ApiQueryParams.COUNT]: count,
      },
    });
  }

  search(params: SearchQueryParams): Observable<ProductModel[]> {
    return this.api.get<ProductModel[]>({
      url: `${ApiControlles.PRODUCTS}${ApiControlles.SEARCH}`,
      params: {
        ...params,
      },
    });
  }

  deleteProductById(id: number): Observable<ProductModel> {
    return this.api.delete<ProductModel>({
      url: `${ApiControlles.PRODUCTS}/${id}`,
    });
  }
}
