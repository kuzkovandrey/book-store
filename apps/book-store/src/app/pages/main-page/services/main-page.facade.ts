import { ProductCategoriesService, ProductsService } from '@features/product';

import { Injectable } from '@angular/core';
import { ProductCategorySection } from '../types';
import { filter, map, mergeAll, mergeMap, Observable, toArray } from 'rxjs';
import { takeFirstByCount } from '@shared/utils';

@Injectable()
export class MainPageFacade {
  private readonly TAKE_COUNT = 5;

  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
    private readonly productsService: ProductsService
  ) {}

  getCategorySections(): Observable<ProductCategorySection[]> {
    return this.productCategoriesService.getAll().pipe(
      map(takeFirstByCount(this.TAKE_COUNT)),
      mergeAll(),
      mergeMap(({ id, name: title }) =>
        this.productsService.getProductsByCategoryId(id, this.TAKE_COUNT).pipe(
          map((products) => ({
            id,
            title,
            products,
          }))
        )
      ),
      filter((r) => !!r.products.length),
      toArray()
    );
  }
}
