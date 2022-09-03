import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule, TuiButtonModule } from '@taiga-ui/core';

import { SearchComponent } from './search.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchBarService } from './services/search-bar.service';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';

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
  ],
  exports: [RouterModule],
  declarations: [SearchComponent, SearchBarComponent, FilterBarComponent],
  providers: [SearchBarService],
})
export class SearchModule {}
