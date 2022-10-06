import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartItemComponent } from '@features/cart';
import { OrderFormComponent } from '@features/order';
import {
  OrderSuccessModalComponent,
  CartItemListComponent,
} from './components';
import { CartPageComponent } from './cart-page.component';

const routes: Routes = [
  {
    path: '',
    component: CartPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    OrderFormComponent,
    CartItemComponent,
  ],
  exports: [RouterModule],
  declarations: [
    CartPageComponent,
    OrderSuccessModalComponent,
    CartItemListComponent,
  ],
})
export class CartPageModule {}
