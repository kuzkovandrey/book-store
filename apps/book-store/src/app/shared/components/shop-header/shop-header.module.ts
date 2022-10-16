import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';

import { ShopHeaderComponent } from './shop-header.component';

@NgModule({
  imports: [CommonModule, RouterModule, TuiButtonModule],
  declarations: [ShopHeaderComponent],
  exports: [ShopHeaderComponent],
})
export class ShopHeaderModule {}
