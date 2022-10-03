import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TuiTagModule,
  TuiIslandModule,
  TuiCarouselModule,
} from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

import {
  ToolbarModule,
  ProductCardComponent,
  CartItemWrapperComponent,
} from '@shared/components';
import { MainComponent } from './main.component';
import { CategorySectionComponent } from './components';
import { MainService } from './services/main.service';

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
    ToolbarModule,
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
