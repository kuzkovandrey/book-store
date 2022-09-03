import { Provider } from '@angular/core';
import { BooksService } from './books.service';
import { CategoriesService } from './categories.service';
import { DeliveryService } from './delivery.service';
import { DiscountsService } from './discounts.service';
import { ProductsService } from './products.service';

export const EntitySerivceProviders: Provider[] = [
  BooksService,
  CategoriesService,
  DeliveryService,
  DiscountsService,
  ProductsService,
];
