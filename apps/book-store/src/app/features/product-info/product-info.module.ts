import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiTagModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

import { ProductInfoComponent } from './product-info.component';
import { ProductPricePipe } from '@shared/pipes/product-price.pipe';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { SimilarComponent } from './components/similar/similar.component';
import { ProductCardComponent } from '@shared/components';

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
    ProductPricePipe,
    ProductCardComponent,
  ],
  exports: [RouterModule],
  declarations: [ProductInfoComponent, BookDetailsComponent, SimilarComponent],
})
export class ProductInfoModule {}
