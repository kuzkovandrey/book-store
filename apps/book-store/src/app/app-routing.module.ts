import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

import { AppRoutes } from '@core/values';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.MAIN,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.MAIN,
    loadChildren: () =>
      import('./features/main/main.module').then((m) => m.MainModule),
    data: {
      hasHeader: true,
      hasFooter: true,
    },
    title: 'Главная',
  },
  {
    path: `${AppRoutes.PRODUCT}/:id`,
    loadChildren: () =>
      import('./features/product-info/product-info.module').then(
        (m) => m.ProductInfoModule
      ),
    data: {
      hasHeader: true,
      hasFooter: true,
      title: 'Подробнее',
    },
  },
  {
    path: AppRoutes.SEARCH,
    loadChildren: () =>
      import('./features/search/search.module').then((m) => m.SearchModule),
    data: {
      hasHeader: true,
      hasFooter: true,
      title: 'Поиск',
    },
  },
  {
    path: AppRoutes.CART,
    loadChildren: () =>
      import('./features/cart/cart.module').then((m) => m.CartModule),
    data: {
      hasHeader: true,
      hasFooter: true,
      title: 'Корзина',
    },
  },
  {
    path: AppRoutes.ADMIN,
    loadChildren: () =>
      import('./features/admin-panel/admin-panel.module').then(
        (m) => m.AdminPanelModule
      ),
    canActivate: [AuthGuard],
    data: {
      hasHeader: false,
      hasFooter: false,
    },
  },
  {
    path: AppRoutes.ORDER_TRACKER,
    loadChildren: () =>
      import('./features/order-tracker/order-tracker.module').then(
        (m) => m.OrderTrackerModule
      ),
    data: {
      hasHeader: true,
      hasFooter: true,
      title: 'Отлеживание заказов',
    },
  },
  {
    path: AppRoutes.AUTH,
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
    data: {
      hasHeader: false,
      hasFooter: false,
      title: 'Вход в личный кабинет',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
