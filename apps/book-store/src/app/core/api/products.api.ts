import { ApiControlles } from '@book-store/shared/values';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '@book-store/shared/models';
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
}
