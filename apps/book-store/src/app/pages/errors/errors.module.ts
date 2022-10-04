import { TuiButtonModule } from '@taiga-ui/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ServiceUnavailableComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: ServiceUnavailableComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), TuiButtonModule],
  declarations: [ServiceUnavailableComponent],
  exports: [RouterModule],
})
export class ErrorsModule {}
