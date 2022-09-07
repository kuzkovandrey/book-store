import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputCountModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';

import { CartComponent } from './cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartService } from './services';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    TuiInputCountModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
  ],
  exports: [RouterModule],
  declarations: [CartComponent, CartItemComponent],
  providers: [CartService],
})
export class CartModule {}
