import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  TuiButtonModule,
  TuiLoaderModule,
  TuiDataListModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiIslandModule,
  TuiTextAreaModule,
  TuiBadgeModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiActionModule,
} from '@taiga-ui/kit';
import { TuiTableModule } from '@taiga-ui/addon-table';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { BooksComponent } from './pages/books/books.component';
import { ProductsComponent } from './pages/products/products.component';
import { BooksService } from './services/books.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateBookFormComponent } from './components/create-book-form/create-book-form.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { LoadingService } from './services/loading.service';
import { ProductsService } from './services/products.service';
import { EditProductModalComponent } from './components/edit-product-modal/edit-product-modal.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { DiscountsService } from './services/discounts.service';
import { DiscountListComponent } from './components/discount-list/discount-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ChangeDiscountModalComponent } from './components/change-discount-modal/change-discount-modal.component';

@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiInputModule,
    TuiTextAreaModule,
    TuiLoaderModule,
    TuiIslandModule,
    TuiBadgeModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiDataListModule,
    TuiTableModule,
    TuiSvgModule,
    TuiActionModule,
  ],
  declarations: [
    AdminPanelComponent,
    BooksComponent,
    ProductsComponent,
    NavbarComponent,
    CreateBookFormComponent,
    AuthorListComponent,
    EditProductModalComponent,
    DiscountsComponent,
    DiscountListComponent,
    ProductListComponent,
    ChangeDiscountModalComponent,
  ],
  providers: [BooksService, LoadingService, ProductsService, DiscountsService],
})
export class AdminPanelModule {}
