import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShopHeaderComponent } from './shop-header.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule, TuiSvgModule } from '@taiga-ui/core';
import { SearchBarService } from './services';

@NgModule({
  imports: [
    CommonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiSvgModule,
    ReactiveFormsModule,
  ],
  declarations: [ShopHeaderComponent],
  exports: [ShopHeaderComponent],
  providers: [SearchBarService],
})
export class ShopHeaderModule {}
