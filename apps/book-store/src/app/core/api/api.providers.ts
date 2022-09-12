import { DiscountsApi } from '@core/api/discounts.api';
import { DeliveryApi } from '@core/api/delivery.api';
import { CategoriesApi } from './categories.api';
import { Provider } from '@angular/core';
import { BookApi } from './books.api';
import { MainApi } from './main.api';
import { ProductsApi } from './products.api';
import { OrdersApi } from './orders.api';

export const ApiProviders: Provider[] = [
  BookApi,
  CategoriesApi,
  DeliveryApi,
  DiscountsApi,
  MainApi,
  ProductsApi,
  OrdersApi,
];
