import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiTagModule } from '@taiga-ui/kit';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [CommonModule, TuiTagModule],
  exports: [ToolbarComponent],
  declarations: [ToolbarComponent],
})
export class ToolbarModule {}
