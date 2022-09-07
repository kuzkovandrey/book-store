import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit';
import {
  TuiTextfieldControllerModule,
  TuiButtonModule,
  TuiDataListModule,
} from '@taiga-ui/core';

import {
  SearchBarComponent,
  FilterComponent,
  FilterEntityComponent,
} from './components';
import { SearchComponent } from './search.component';
import { SearchBarService, FilterService } from './services';
import {
  CartItemWrapperComponent,
  ProductCardComponent,
} from '@shared/components';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiMultiSelectModule,
    ProductCardComponent,
    CartItemWrapperComponent,
  ],
  exports: [RouterModule],
  declarations: [
    SearchComponent,
    SearchBarComponent,
    FilterComponent,
    FilterEntityComponent,
  ],
  providers: [SearchBarService, FilterService],
})
export class SearchModule {}
