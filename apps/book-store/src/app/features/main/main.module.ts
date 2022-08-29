import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { GenreToolbarComponent } from './components/genre-toolbar/genre-toolbar.component';
import {
  TuiTagModule,
  TuiIslandModule,
  TuiCarouselModule,
} from '@taiga-ui/kit';
import { AuthorToolbarComponent } from './components/author-toolbar/author-toolbar.component';
import { ToolbarModule } from '@shared/ui';
import { ProductCardComponent } from '@shared/ui';
import { MainService } from './services/main.service';
import { CategorySectionComponent } from './components/category-section/category-section.component';
import { CategorySectionSkeletonComponent } from './components/category-section-skeleton/category-section-skeleton.component';
import { TuiButtonModule } from '@taiga-ui/core';

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
    TuiIslandModule,
    TuiCarouselModule,
    ProductCardComponent,
    TuiButtonModule,
  ],
  exports: [RouterModule],
  declarations: [
    MainComponent,
    GenreToolbarComponent,
    AuthorToolbarComponent,
    CategorySectionComponent,
    CategorySectionSkeletonComponent,
  ],
  providers: [MainService],
})
export class MainModule {}
