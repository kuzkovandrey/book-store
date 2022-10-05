import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiTextfieldControllerModule,
  TuiButtonModule,
  TuiDataListModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { SearchFilterItemComponent } from './components/search-filter-item/search-filter-item.component';
import { SearchBarService, SearchFilterService } from './services';

@NgModule({
  imports: [
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiMultiSelectModule,
    CommonModule,
  ],
  declarations: [
    SearchBarComponent,
    SearchFilterComponent,
    SearchFilterItemComponent,
  ],
  exports: [SearchBarComponent, SearchFilterComponent],
  providers: [SearchBarService, SearchFilterService],
})
export class SearchModule {}
