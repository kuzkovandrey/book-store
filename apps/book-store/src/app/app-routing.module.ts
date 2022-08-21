import { AppRoutes } from './core/values/app-routes.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.ADMIN,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.ADMIN,
    loadChildren: () =>
      import('./features/admin-panel/admin-panel.module').then(
        (m) => m.AdminPanelModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
