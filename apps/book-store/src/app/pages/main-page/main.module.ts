import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TuiTagModule,
  TuiIslandModule,
  TuiCarouselModule,
} from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

import { MainComponent } from './main.component';
import { ProductsSectionComponent } from './components';
import { MainPageFacade } from './services';
import { TextOverflowPipe } from '@shared/pipes';
import {
  ProductCardButtonComponent,
  ProductCardComponent,
} from '@features/product';
import { CartItemWrapperComponent } from '@features/cart';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TuiTagModule,
    CommonModule,
    TuiIslandModule,
    TuiCarouselModule,
    TuiButtonModule,
    ProductCardComponent,
    CartItemWrapperComponent,
    ProductCardButtonComponent,
    TextOverflowPipe,
  ],
  declarations: [MainComponent, ProductsSectionComponent],
  providers: [MainPageFacade],
  exports: [RouterModule],
})
export class MainModule {}
