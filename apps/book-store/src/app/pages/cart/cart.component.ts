import { AppRoutes, CommonErrorMessages } from '@core/values';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogService } from '@taiga-ui/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, tap, switchMap } from 'rxjs';

import { LoadingService, AlertService } from '@core/services';
import { CartList } from './models/cart.model';
import { OrderFormModel } from './models';
import { CreateOrderDto } from '@book-store/shared/dto';
import { OrderSuccessModalComponent } from './components/order-success-modal/order-success-modal.component';
import { Router } from '@angular/router';
import { OrdersService } from '@features/order';
import { CartService } from '@features/cart';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private readonly createOrder$ = new Subject<CreateOrderDto>();

  cartList: CartList;

  orderForm: OrderFormModel;

  totalPrice: number;

  constructor(
    private cartService: CartService,
    private loadingService: LoadingService,
    private dialogService: TuiDialogService,
    private ordersService: OrdersService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadingService.setLoading(true);

    // this.subscriptions.add(
    //   this.cartService
    //     .getCartProductList()
    //     .pipe(tap(() => this.loadingService.setLoading(false)))
    //     .subscribe((cartList) => {
    //       this.cartList = cartList;

    //       this.calculateTotalPrice();
    //     })
    // );

    // this.subscriptions.add(
    //   this.createOrder$
    //     .pipe(
    //       tap(() => this.loadingService.setLoading(true)),
    //       switchMap((orderDto) => this.ordersService.createOrder(orderDto)),
    //       tap(() => this.loadingService.setLoading(false))
    //     )
    //     .subscribe({
    //       next: this.handleSuccessCreateOrder,
    //       error: () => {
    //         this.alertService.showError(CommonErrorMessages.UPLOAD_ERROR);
    //       },
    //     })
    // );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    // this.cartService.saveCartListToStorage(this.cartList);
  }

  // private handleSuccessCreateOrder = () => {
  //   this.openSuccessModal();
  //   this.cartService.resetStorageCartList();
  //   this.cartList = [];
  // };

  deleteItemFromCartList(id: number) {
    this.cartList = this.cartList.filter(({ product }) => product.id !== id);

    // this.calculateTotalPrice();
  }

  changeCountItems([id, count]: [id: number, count: number]) {
    const item = this.cartList.find((item) => item.product.id === id);

    if (item) item.count = count;

    // this.calculateTotalPrice();
  }

  onChangeOrderForm(orderForm: OrderFormModel) {
    this.orderForm = orderForm;
  }

  // calculateTotalPrice() {
  //   this.totalPrice = this.cartService.calculateTotalPrice(this.cartList);
  // }

  createOrder() {
    this.createOrder$.next({
      ...this.orderForm,
      totalPrice: this.totalPrice,
      productList: this.cartList.map(({ product, count }) => ({
        productId: product.id,
        count,
      })),
    });
  }

  navigateToProductPage(id: number) {
    this.router.navigate([AppRoutes.PRODUCT, id]);
  }

  navigateToSearchPage() {
    this.router.navigate([AppRoutes.SEARCH]);
  }

  openSuccessModal() {
    this.subscriptions.add(
      this.dialogService
        .open(new PolymorpheusComponent(OrderSuccessModalComponent))
        .subscribe(() => {
          // navigate to tracker page
        })
    );
  }
}
