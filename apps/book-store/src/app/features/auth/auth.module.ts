import { ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { AppRoutes } from '@core/values';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.LOGIN,
  },
  {
    path: AppRoutes.LOGIN,
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [LoginComponent],
})
export class AuthModule {}
