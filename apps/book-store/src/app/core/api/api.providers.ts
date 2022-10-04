import { Provider } from '@angular/core';
// import { ProductDiscountsApi } from '@core/api/product-discounts.api';
// import { DeliveryApi } from '@core/api/delivery.api';
// import { ProductCategoriesApi } from './product-categories.api';
// import { BookApi } from './books.api';
import { MainApi } from './main.api';

export const ApiProviders: Provider[] = [
  // BookApi,
  // ProductCategoriesApi,
  // DeliveryApi,
  // ProductDiscountsApi,
  MainApi,

  // AuthApi,
];
