import { Injectable } from '@angular/core';
import { CategoryModel, MainPageSection } from '@book-store/shared/models';
import { ApiQueryParams } from '@book-store/shared/values';
import { MainApi } from '@core/api';
import { Observable, forkJoin, map } from 'rxjs';
import { ProductsApi } from '@features/product/api';

@Injectable()
export class MainService {
  constructor(private productsApi: ProductsApi, private mainApi: MainApi) {}

  getMainPageSecrions(): Observable<MainPageSection[]> {
    return forkJoin([
      this.mainApi.getMainPageSecrions(),
      this.productsApi.search({
        [ApiQueryParams.PAGE]: 1,
        [ApiQueryParams.PER_PAGE]: 5,
      }),
    ]).pipe(
      map(([mainSection, productList]) => [
        {
          productList,
          category: {
            name: 'Все книги',
          } as CategoryModel,
        },
        ...mainSection,
      ])
    );
  }
}
