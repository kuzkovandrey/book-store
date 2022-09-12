import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiInputCountModule,
  TuiInputModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiTextfieldControllerModule,
  TuiDataListModule,
} from '@taiga-ui/core';

import { CartComponent } from './cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { ProductPricePipe } from '@shared/pipes';
import { ProductPriceService } from '@core/services';
import { OrderSuccessModalComponent } from './components/order-success-modal/order-success-modal.component';

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
    TuiInputModule,
    TuiDataListModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    ProductPricePipe,
  ],
  exports: [RouterModule],
  declarations: [
    CartComponent,
    CartItemComponent,
    OrderFormComponent,
    OrderSuccessModalComponent,
  ],
  providers: [ProductPriceService],
})
export class CartModule {}