import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, tap } from 'rxjs';

import { LoadingService } from '@core/services/loading.service';
import { CartService } from './services';
import { CartList } from './models/cart.model';
import { OrderFormModel } from './models';
import { CreateOrderDto } from '@book-store/shared/dto';

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
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.cartService
        .getCartProductList()
        .pipe(tap(() => this.loadingService.setLoading(false)))
        .subscribe((cartList) => {
          this.cartList = cartList;

          this.calculateTotalPrice();
        })
    );

    this.subscriptions.add(
      this.createOrder$.subscribe((r) => {
        console.log(r);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.cartService.saveCartListToStorage(this.cartList);
  }

  deleteItemFromCartList(id: number) {
    this.cartList = this.cartList.filter(({ product }) => product.id !== id);

    this.calculateTotalPrice();
  }

  changeCountItems([id, count]: [id: number, count: number]) {
    const item = this.cartList.find((item) => item.product.id === id);

    if (item) item.count = count;

    this.calculateTotalPrice();
  }

  onChangeOrderForm(orderForm: OrderFormModel) {
    this.orderForm = orderForm;
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartService.calculateTotalPrice(this.cartList);
  }

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
}
