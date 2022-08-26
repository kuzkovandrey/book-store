import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { GenreToolbarComponent } from './components/genre-toolbar/genre-toolbar.component';
import { TuiTagModule } from '@taiga-ui/kit';
import { AuthorToolbarComponent } from './components/author-toolbar/author-toolbar.component';
import { ToolbarModule } from '@shared/ui';
import { ProductCardComponent } from '@shared/ui';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TuiTagModule,
    CommonModule,
    ToolbarModule,
    ProductCardComponent,
  ],
  exports: [RouterModule],
  declarations: [MainComponent, GenreToolbarComponent, AuthorToolbarComponent],
})
export class MainModule {}
