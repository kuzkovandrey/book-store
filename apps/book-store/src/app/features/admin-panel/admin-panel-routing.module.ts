import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from '@core/values';
import { AdminPanelComponent } from './admin-panel.component';
import { BooksComponent } from './pages/books/books.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { ProductsComponent } from './pages/products/products.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
