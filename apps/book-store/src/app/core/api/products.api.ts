import { ApiControlles, ApiQueryParams } from '@book-store/shared/values';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel, SearchQueryParams } from '@book-store/shared/models';
import { ChangeProductValuesDto } from '@book-store/shared/dto';

@Injectable()
export class ProductsApi {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(ApiControlles.PRODUCTS);
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${ApiControlles.PRODUCTS}/${id}`);
  }

  changeValues(
    id: number,
    changes: ChangeProductValuesDto
  ): Observable<ProductModel> {
    return this.http.patch<ProductModel>(
      `${ApiControlles.PRODUCTS}/${id}`,
      changes
    );
  }

  getSimilarById(id: number, count: number) {
    return this.http.get<ProductModel[]>(
      `${ApiControlles.PRODUCTS}${ApiControlles.SIMILAR}`,
      {
        params: {
          [ApiQueryParams.ID]: id,
          [ApiQueryParams.COUNT]: count,
        },
      }
    );
  }

  search(params: SearchQueryParams): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(
      `${ApiControlles.PRODUCTS}${ApiControlles.SEARCH}`,
      { params: { ...params } }
    );
  }

  deleteProductById(id: number): Observable<ProductModel> {
    return this.http.delete<ProductModel>(`${ApiControlles.PRODUCTS}/${id}`);
  }
}
