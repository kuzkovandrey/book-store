import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiTagModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

import { ProductInfoComponent } from './product-info.component';

const routes: Routes = [
  {
    path: '',
    component: ProductInfoComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TuiTagModule,
    CommonModule,
    TuiButtonModule,
  ],
  exports: [RouterModule],
  declarations: [ProductInfoComponent],
})
export class ProductInfoModule {}
