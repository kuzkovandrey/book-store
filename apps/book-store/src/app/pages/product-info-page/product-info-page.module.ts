import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiTagModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

import { ProductCardComponent, ProductPricePipe } from '@features/product';
import { CartItemWrapperComponent } from '@features/cart';
import { SimilarComponent, BookDetailsComponent } from './components';
import { ProductInfoPageComponent } from './product-info-page.component';
import { ProductInfoPageFacade } from './product-info-page.facade';

const routes: Routes = [
  {
    path: '',
    component: ProductInfoPageComponent,
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
    CartItemWrapperComponent,
  ],
  declarations: [
    ProductInfoPageComponent,
    BookDetailsComponent,
    SimilarComponent,
  ],
  providers: [ProductInfoPageFacade],
  exports: [RouterModule],
})
export class ProductInfoPageModule {}
