import { ProductCategoriesApi } from '../api';
import { Injectable } from '@angular/core';
import {
  AddCategoryToProductDto,
  CategoryModel,
  CreateCategoryDto,
  ProductModel,
} from '@book-store/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoriesService {
  constructor(private categoriesApi: ProductCategoriesApi) {}

  getAll(): Observable<CategoryModel[]> {
    return this.categoriesApi.getAll();
  }

  createCategory(dto: CreateCategoryDto): Observable<CategoryModel> {
    return this.categoriesApi.createCategory(dto);
  }

  deleteCategory(id: number): Observable<CategoryModel> {
    return this.categoriesApi.deleteCategory(id);
  }

  changeCategoryValues(
    id: number,
    dto: CreateCategoryDto
  ): Observable<CategoryModel> {
    return this.categoriesApi.changeCategoryValues(id, dto);
  }

  addCategoryToProduct(dto: AddCategoryToProductDto): Observable<ProductModel> {
    return this.categoriesApi.addCategoryToProduct(dto);
  }
}
