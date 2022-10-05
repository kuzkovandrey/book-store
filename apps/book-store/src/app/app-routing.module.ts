import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServiceUnavailableGuard } from '@core/guards';
import { AppRoutes } from '@core/values';
import { AuthGuard } from '@features/auth';

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.MAIN,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.MAIN,
    canActivate: [ServiceUnavailableGuard],
    canActivateChild: [ServiceUnavailableGuard],
    loadChildren: () =>
      import('./pages/main-page/main.module').then((m) => m.MainModule),
    data: {
      hasHeader: true,
      hasFooter: true,
    },
    title: 'Главная',
  },
  {
    path: `${AppRoutes.PRODUCT}/:id`,
    canActivate: [ServiceUnavailableGuard],
    canActivateChild: [ServiceUnavailableGuard],
    loadChildren: () =>
      import('./pages/product-info/product-info.module').then(
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
    canActivate: [ServiceUnavailableGuard],
    canActivateChild: [ServiceUnavailableGuard],
    loadChildren: () =>
      import('./pages/search-page/search-page.module').then(
        (m) => m.SearchPageModule
      ),
    data: {
      hasHeader: true,
      hasFooter: true,
      title: 'Поиск',
    },
  },
  {
    path: AppRoutes.CART,
    canActivate: [ServiceUnavailableGuard],
    canActivateChild: [ServiceUnavailableGuard],
    loadChildren: () =>
      import('./pages/cart/cart.module').then((m) => m.CartModule),
    data: {
      hasHeader: true,
      hasFooter: true,
      title: 'Корзина',
    },
  },
  {
    path: AppRoutes.ADMIN,
    loadChildren: () =>
      import('./pages/admin-panel/admin-panel.module').then(
        (m) => m.AdminPanelModule
      ),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      hasHeader: false,
      hasFooter: false,
    },
  },
  {
    path: AppRoutes.ORDER_TRACKER,
    canActivate: [ServiceUnavailableGuard],
    canActivateChild: [ServiceUnavailableGuard],
    loadChildren: () =>
      import('./pages/order-tracker/order-tracker.module').then(
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
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
    data: {
      hasHeader: false,
      hasFooter: false,
      title: 'Вход в личный кабинет',
    },
  },
  {
    path: AppRoutes.ERROR,
    loadChildren: () =>
      import('./pages/errors/errors.module').then((m) => m.ErrorsModule),
    data: {
      hasHeader: false,
      hasFooter: false,
      title: 'Произошла ошибка',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
