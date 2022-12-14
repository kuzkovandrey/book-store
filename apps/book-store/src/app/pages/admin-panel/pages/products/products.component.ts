import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogService } from '@taiga-ui/core';
import { Subject, Subscription, switchMap, tap } from 'rxjs';

import { AlertService, LoadingService } from '@core/services';
import {
  AddDiscountDto,
  ProductModel,
  DiscountModel,
  CategoryModel,
  ChangeCategoryDto,
  BookModel,
} from '@book-store/shared';
import {
  EditProductModalComponent,
  ProductListComponent,
  ChangeDiscountModalComponent,
  ChangeCategoryModalComponent,
} from 'src/app/pages/admin-panel/components';
import { ProductChanges } from 'src/app/pages/admin-panel/types';
import { ErrorMessages } from 'src/app/pages/admin-panel/values';
import { AppRoutes, CommonErrorMessages } from '@core/values';
import { Router } from '@angular/router';
import {
  ProductCategoriesService,
  ProductDiscountsService,
  ProductsService,
} from '@features/product';

@Component({
  selector: 'book-store-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private readonly changeProductValues$ = new Subject<ProductChanges>();

  private readonly changeProductDiscount$ = new Subject<AddDiscountDto>();

  private readonly changeProductCategory$ = new Subject<ChangeCategoryDto>();

  private readonly deleteProduct$ = new Subject<number>();

  private readonly getAllProducts$ = new Subject<void>();

  @ViewChild(ProductListComponent, { read: ProductListComponent })
  private productListComponent: ProductListComponent;

  private discountList: DiscountModel[] = [];

  private categoryList: CategoryModel[] = [];

  productList: ProductModel[] = [];

  constructor(
    private alertService: AlertService,
    private productsService: ProductsService,
    private loadingService: LoadingService,
    private discountDiscountsService: ProductDiscountsService,
    private categoriesService: ProductCategoriesService,
    @Inject(TuiDialogService)
    private dialogService: TuiDialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.discountDiscountsService.getAll().subscribe({
        next: this.setDiscountList,
        error: this.showError.bind(CommonErrorMessages.UPLOAD_ERROR),
      })
    );

    this.subscriptions.add(
      this.getAllProducts$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap(() => this.productsService.getAll()),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.setProductList,
          error: this.showError.bind(CommonErrorMessages.UPLOAD_ERROR),
        })
    );

    this.subscriptions.add(
      this.categoriesService.getAll().subscribe({
        next: this.setCategoryList,
        error: this.showError.bind(CommonErrorMessages.UPLOAD_ERROR),
      })
    );

    this.subscriptions.add(
      this.changeProductValues$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap(({ id, totalCount, onSale, cost }) =>
            this.productsService.changeValues(id, {
              totalCount,
              onSale,
              cost,
            })
          ),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.handleChangeProductValues,
          error: this.showError.bind(ErrorMessages.CHANGE_PRODUCT_VALUES),
        })
    );

    this.subscriptions.add(
      this.changeProductDiscount$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap((addDiscount) =>
            this.discountDiscountsService.addDiscountToProduct(addDiscount)
          ),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.handleChangeProductValues,
          error: this.showError.bind(ErrorMessages.CHANGE_DISCOUNT),
        })
    );

    this.subscriptions.add(
      this.changeProductCategory$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap((dto) => this.categoriesService.addCategoryToProduct(dto)),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.getAllProducts,
          error: this.showError.bind(ErrorMessages.CHANGE_CATEGORY),
        })
    );

    this.subscriptions.add(
      this.deleteProduct$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap((id) => this.productsService.deleteProductById(id)),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.getAllProducts,
          error: this.showError.bind(ErrorMessages.DELETE_BOOK),
        })
    );

    this.getAllProducts();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private showError = (message: string) => {
    this.alertService.showError(message);
  };

  private setProductList = (productList: ProductModel[]) => {
    this.productList = productList;
  };

  private setDiscountList = (discountList: DiscountModel[]) => {
    this.discountList = discountList;
  };

  private setCategoryList = (categoryList: CategoryModel[]) => {
    this.categoryList = categoryList;
  };

  private getAllProducts = () => {
    this.getAllProducts$.next();
  };

  private handleChangeProductValues = (product: ProductModel) => {
    this.changeProduct(product);
    this.productListComponent.updateView();
  };

  private changeProduct = (prod: ProductModel) => {
    const product = this.productList.find((p) => p.id === prod.id);

    if (!product) throw new Error('Product not fount');

    product.cost = prod.cost;
    product.onSale = prod.onSale;
    product.totalCount = prod.totalCount;
    product.updatedAt = prod.updatedAt;
    product.discount = prod.discount;
  };

  navigateToEditBookPage(book: BookModel) {
    this.router.navigate([AppRoutes.ADMIN, AppRoutes.BOOKS], {
      state: {
        book,
      },
    });
  }

  openEditModal(product: ProductModel) {
    this.dialogService
      .open<ProductChanges>(
        new PolymorpheusComponent(EditProductModalComponent),
        {
          data: {
            product,
          },
        }
      )
      .subscribe((changes) => {
        this.changeProductValues$.next(changes);
      });
  }

  openChangeDiscountModal(product: ProductModel) {
    this.dialogService
      .open<AddDiscountDto>(
        new PolymorpheusComponent(ChangeDiscountModalComponent),
        {
          data: {
            product,
            discountList: this.discountList,
          },
        }
      )
      .subscribe((values) => {
        this.changeProductDiscount$.next(values);
      });
  }

  openChangeCategoryModal(product: ProductModel) {
    this.dialogService
      .open<ChangeCategoryDto>(
        new PolymorpheusComponent(ChangeCategoryModalComponent),
        {
          data: {
            product: product,
            categoryList: this.categoryList,
          },
        }
      )
      .subscribe((values) => {
        console.log(values);
        this.changeProductCategory$.next(values);
      });
  }

  deleteProduct(product: ProductModel) {
    this.deleteProduct$.next(product.book.id);
  }
}
