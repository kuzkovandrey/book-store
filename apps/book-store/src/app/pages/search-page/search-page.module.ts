import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchPageComponent } from './search-page.component';

import { ProductCardComponent } from '@features/product';
import { CartItemWrapperComponent } from '@features/cart';
import { SearchModule } from '@features/search';
import { SearchPageFacade } from './search-page.facade';

const routes: Routes = [
  {
    path: '',
    component: SearchPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ProductCardComponent,
    CartItemWrapperComponent,
    SearchModule,
  ],
  exports: [RouterModule],
  declarations: [SearchPageComponent],
  providers: [SearchPageFacade],
})
export class SearchPageModule {}
