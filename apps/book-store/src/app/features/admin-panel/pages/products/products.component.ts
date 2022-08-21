import { AlertService } from '@core/services/alert.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { LoadingService } from '@features/admin-panel/services/loading.service';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Model, Product, Discount, AddDiscountDto } from '@book-store/shared';
import {
  ProductsService,
  DiscountsService,
} from '@features/admin-panel/services';
import { Subject, Subscription, switchMap, tap } from 'rxjs';
import { TuiDialogService } from '@taiga-ui/core';
import {
  EditProductModalComponent,
  ProductListComponent,
  ChangeDiscountModalComponent,
} from '@features/admin-panel/components';
import { ProductChanges } from '@features/admin-panel/types';
import { CommomErrorMessages } from '@core/values/common-error-messages.enum';
import { ErrorMessages } from '@features/admin-panel/values';

@Component({
  selector: 'book-store-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private readonly changeProductValues = new Subject<ProductChanges>();

  private readonly changeProductDiscount = new Subject<AddDiscountDto>();

  @ViewChild(ProductListComponent, { read: ProductListComponent })
  private productListComponent: ProductListComponent;

  private discountList: Model<Discount>[] = [];

  productList: Model<Product>[] = [];

  constructor(
    private alertService: AlertService,
    private productsService: ProductsService,
    private loadingService: LoadingService,
    private discountsService: DiscountsService,
    @Inject(TuiDialogService)
    private dialogService: TuiDialogService
  ) {}

  ngOnInit() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.discountsService.getAll().subscribe({
        next: this.setDiscountList,
        error: this.showError.bind(CommomErrorMessages.UPLOAD_ERROR),
      })
    );

    this.subscriptions.add(
      this.productsService
        .getAll()
        .pipe(tap(() => this.loadingService.setLoading(false)))
        .subscribe({
          next: this.setProductList,
          error: this.showError.bind(CommomErrorMessages.UPLOAD_ERROR),
        })
    );

    this.subscriptions.add(
      this.changeProductValues
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
      this.changeProductDiscount
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap((addDiscount) =>
            this.discountsService.addDiscountToProduct(addDiscount)
          ),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.handleChangeProductValues,
          error: this.showError.bind(ErrorMessages.CHANGE_DISCOUNT),
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private showError = (message: string) => {
    this.alertService.showError(message);
  };

  private setProductList = (productList: Model<Product>[]) => {
    this.productList = productList;
  };

  private setDiscountList = (discountList: Model<Discount>[]) => {
    this.discountList = discountList;
  };

  private handleChangeProductValues = (product: Model<Product>) => {
    this.changeProduct(product);
    this.productListComponent.updateView();
  };

  private changeProduct = (prod: Model<Product>) => {
    const product = this.productList.find((p) => p.id === prod.id);

    if (!product) throw new Error('Product not fount');

    product.cost = prod.cost;
    product.onSale = prod.onSale;
    product.totalCount = prod.totalCount;
    product.updatedAt = prod.updatedAt;
    product.discount = prod.discount;
  };

  openEditModal(product: Model<Product>) {
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
        this.changeProductValues.next(changes);
      });
  }

  openChangeDiscountModal(product: Model<Product>) {
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
        this.changeProductDiscount.next(values);
      });
  }

  deleteProduct(product: Model<Product>) {}
}
