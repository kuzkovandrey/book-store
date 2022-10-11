import { ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page.component';
import { NgModule } from '@angular/core';
import { AppRoutes } from '@core/values';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.LOGIN,
  },
  {
    path: AppRoutes.LOGIN,
    component: AuthPageComponent,
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
  declarations: [AuthPageComponent, AuthFormComponent],
})
export class AuthPageModule {}
