import { ApiControlles } from '@book-store/shared/values';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, Product } from '@book-store/shared/models';
import { ChangeProductValuesDto } from '@book-store/shared/dto';

@Injectable()
export class ProductsApi {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Model<Product>[]> {
    return this.http.get<Model<Product>[]>(ApiControlles.PRODUCTS);
  }

  changeValues(
    id: number,
    changes: ChangeProductValuesDto
  ): Observable<Model<Product>> {
    return this.http.patch<Model<Product>>(
      `${ApiControlles.PRODUCTS}/${id}`,
      changes
    );
  }
}
