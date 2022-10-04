import { ApiGateway } from '@core/api/api.gateway';
import { ApiControlles } from '@book-store/shared/values';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CategoryModel,
  ProductModel,
  CreateCategoryDto,
  AddCategoryToProductDto,
} from '@book-store/shared';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoriesApi {
  constructor(private api: ApiGateway) {}

  getAll(): Observable<CategoryModel[]> {
    return this.api.get<CategoryModel[]>({
      url: ApiControlles.CATEGORIES,
    });
  }

  createCategory(body: CreateCategoryDto): Observable<CategoryModel> {
    return this.api.post<CategoryModel>({
      url: ApiControlles.CATEGORIES,
      body,
    });
  }

  deleteCategory(id: number): Observable<CategoryModel> {
    return this.api.delete<CategoryModel>({
      url: `${ApiControlles.CATEGORIES}/${id}`,
    });
  }

  changeCategoryValues(
    id: number,
    body: CreateCategoryDto
  ): Observable<CategoryModel> {
    return this.api.patch<CategoryModel>({
      url: `${ApiControlles.CATEGORIES}/${id}`,
      body,
    });
  }

  addCategoryToProduct(
    body: AddCategoryToProductDto
  ): Observable<ProductModel> {
    return this.api.post<ProductModel>({
      url: `${ApiControlles.CATEGORIES}${ApiControlles.ADD}`,
      body,
    });
  }
}
