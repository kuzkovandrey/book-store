import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  TuiButtonModule,
  TuiLoaderModule,
  TuiDataListModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiIslandModule,
  TuiTextAreaModule,
  TuiBadgeModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiActionModule,
  TuiToggleModule,
  TuiInputTimeModule,
} from '@taiga-ui/kit';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { BooksComponent } from './pages/books/books.component';
import { ProductsComponent } from './pages/products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateBookFormComponent } from './components/create-book-form/create-book-form.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { EditProductModalComponent } from './components/edit-product-modal/edit-product-modal.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { DiscountListComponent } from './components/discount-list/discount-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ChangeDiscountModalComponent } from './components/change-discount-modal/change-discount-modal.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { CreateDeliveryFormComponent } from './components/create-delivery-form/create-delivery-form.component';
import { DeliveryPointListComponent } from './components/delivery-point-list/delivery-point-list.component';
import { EditDeliveryPointModalComponent } from './components/edit-delivery-point-modal/edit-delivery-point-modal.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CreateCategoryFormComponent } from './components/create-category-form/create-category-form.component';
import { EditCategoryModalComponent } from './components/edit-category-modal/edit-category-modal.component';
import { ChangeCategoryModalComponent } from './components/change-category-modal/change-category-modal.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderStateToTextPipe } from '@features/order/pipes/order-state-to-text.pipe';
import { ChangeOrderStateModalComponent } from './components/change-order-state-modal/change-order-state-modal.component';

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
    TuiSvgModule,
    TuiActionModule,
    TuiToggleModule,
    TuiInputTimeModule,
    TuiTextfieldControllerModule,
    OrderStateToTextPipe,
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
    DeliveryComponent,
    CreateDeliveryFormComponent,
    DeliveryPointListComponent,
    EditDeliveryPointModalComponent,
    CategoriesComponent,
    CategoryListComponent,
    CreateCategoryFormComponent,
    EditCategoryModalComponent,
    ChangeCategoryModalComponent,
    OrdersComponent,
    ChangeOrderStateModalComponent,
  ],
})
export class AdminPanelModule {}
