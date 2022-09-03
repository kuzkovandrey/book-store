import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShopHeaderComponent } from './shop-header.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ShopHeaderComponent],
  exports: [ShopHeaderComponent],
})
export class ShopHeaderModule {}
