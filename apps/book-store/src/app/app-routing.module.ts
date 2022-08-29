import { AppRoutes } from './core/values/app-routes.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    },
  },
  {
    path: AppRoutes.ADMIN,
    loadChildren: () =>
      import('./features/admin-panel/admin-panel.module').then(
        (m) => m.AdminPanelModule
      ),
    data: {
      hasHeader: false,
      hasFooter: false,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
