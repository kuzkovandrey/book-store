import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiTagModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

import { SearchComponent } from './search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // TuiTagModule,
    CommonModule,
    // TuiButtonModule,
  ],
  exports: [RouterModule],
  declarations: [SearchComponent],
})
export class SearchModule {}
