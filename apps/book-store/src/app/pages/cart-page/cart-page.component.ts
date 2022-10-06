import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';

import {
  LoadingService,
  AlertService,
  ModalDialogService,
} from '@core/services';
import { OrderFormModel } from '@features/order';
import { CartList } from '@features/cart';
import { DeliveryModel } from '@book-store/shared/models';
import { CreateOrderDto } from '@book-store/shared/dto';
import { OrderSuccessModalComponent } from './components';
import { CartPageFacade, CartDataService } from './services';

@Component({
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  providers: [CartPageFacade, CartDataService],
})
export class CartPageComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private readonly createOrder$ = new Subject<CreateOrderDto>();

  private newOrderDtoModel: Partial<CreateOrderDto>;

  readonly deliveryList$: Observable<DeliveryModel[]>;

  cartList: CartList;

  orderForm: OrderFormModel;

  totalPrice: number;

  get showOrderForm(): boolean {
    return this.newOrderDtoModel && !!this.newOrderDtoModel.productList?.length;
  }

  constructor(
    private loadingService: LoadingService,
    private modalDialogService: ModalDialogService,
    private cartPageFacade: CartPageFacade,
    private cartDataService: CartDataService,
    private alertService: AlertService
  ) {
    this.deliveryList$ = cartPageFacade.getDeliveryList();
  }

  ngOnInit() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      combineLatest([
        this.cartDataService.productItemList$,
        this.cartDataService.totalPrice$,
      ]).subscribe(([productList, totalPrice]) => {
        this.newOrderDtoModel = {
          ...this.newOrderDtoModel,
          productList,
          totalPrice,
        };
      })
    );
  }

  onChangeOrderForm(form: OrderFormModel) {
    this.newOrderDtoModel = {
      ...this.newOrderDtoModel,
      ...form,
    };
  }

  createOrder() {
    this.subscriptions.add(
      this.cartPageFacade
        .createOrder(this.newOrderDtoModel as CreateOrderDto)
        .subscribe({
          next: () => {
            this.cartDataService.resetCartList();
            this.openSuccessModal();
          },
          error: this.handleError,
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private handleError = () => {
    this.alertService.showError('Ошибка при офрмлении заказа');
  };

  private openSuccessModal() {
    this.subscriptions.add(
      this.modalDialogService.open(OrderSuccessModalComponent).subscribe()
    );
  }
}
