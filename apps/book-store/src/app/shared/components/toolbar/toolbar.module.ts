import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { TuiTagModule } from '@taiga-ui/kit';

@NgModule({
  imports: [CommonModule, TuiTagModule],
  exports: [ToolbarComponent],
  declarations: [ToolbarComponent],
})
export class ToolbarModule {}
