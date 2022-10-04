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
import { CategorySectionComponent } from './components';
import { MainService } from './services/main.service';
import { ProductCardComponent } from '@features/product';
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
    ProductCardComponent,
    TuiButtonModule,
    CartItemWrapperComponent,
  ],
  declarations: [MainComponent, CategorySectionComponent],
  providers: [MainService],
  exports: [RouterModule],
})
export class MainModule {}
