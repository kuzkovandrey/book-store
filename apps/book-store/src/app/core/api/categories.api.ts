import { ApiControlles } from '@book-store/shared/values';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CategoryModel,
  ProductModel,
  CreateCategoryDto,
  AddCategoryToProductDto,
} from '@book-store/shared';

@Injectable()
export class CategoriesApi {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(ApiControlles.CATEGORIES);
  }

  createCategory(dto: CreateCategoryDto): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(ApiControlles.CATEGORIES, dto);
  }

  deleteCategory(id: number): Observable<CategoryModel> {
    return this.http.delete<CategoryModel>(`${ApiControlles.CATEGORIES}/${id}`);
  }

  changeCategoryValues(
    id: number,
    dto: CreateCategoryDto
  ): Observable<CategoryModel> {
    return this.http.patch<CategoryModel>(
      `${ApiControlles.CATEGORIES}/${id}`,
      dto
    );
  }

  addCategoryToProduct(dto: AddCategoryToProductDto): Observable<ProductModel> {
    return this.http.post<ProductModel>(
      `${ApiControlles.CATEGORIES}${ApiControlles.ADD}`,
      dto
    );
  }
}
