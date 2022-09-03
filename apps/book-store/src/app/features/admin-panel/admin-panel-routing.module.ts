import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from '@core/values';
import { AdminPanelComponent } from './admin-panel.component';
import {
  BooksComponent,
  DiscountsComponent,
  ProductsComponent,
  DeliveryComponent,
  CategoriesComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AppRoutes.BOOKS,
      },
      {
        path: AppRoutes.BOOKS,
        component: BooksComponent,
        title: 'Новая книга',
      },
      {
        path: AppRoutes.PRODUCTS,
        component: ProductsComponent,
        title: 'Все книги',
      },
      {
        path: AppRoutes.DISCOUNTS,
        component: DiscountsComponent,
        title: 'Скидки',
      },
      {
        path: AppRoutes.DELIVERY,
        component: DeliveryComponent,
        title: 'Пункты выдачи',
      },
      {
        path: AppRoutes.CATEGORIES,
        component: CategoriesComponent,
        title: 'Категории',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
