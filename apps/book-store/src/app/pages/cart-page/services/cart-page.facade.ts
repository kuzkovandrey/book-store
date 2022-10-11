import { DeliveryService } from '@features/delivery';
import { ProductPriceService, ProductsService } from '@features/product';
import { Injectable } from '@angular/core';
import { CartService } from '@features/cart';
import {
  CartItem,
  CartItemCountChangeEvent,
  CartList,
} from '@features/cart/types';
import { OrdersService } from '@features/order';
import {
  catchError,
  map,
  mergeAll,
  mergeMap,
  Observable,
  of,
  toArray,
} from 'rxjs';
import { CreateOrderDto } from '@book-store/shared/dto';
import { DeliveryModel, SuccessCreateOrder } from '@book-store/shared/models';

@Injectable()
export class CartPageFacade {
  constructor(
    private readonly cartService: CartService,
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly deliveryService: DeliveryService
  ) {}

  getCartList(): Observable<CartList> {
    return this.cartService.getAll$().pipe(
      mergeAll(),
      mergeMap(({ id, count }) =>
        this.productsService.getProductById(id).pipe(
          map((product) => ({ product, count })),
          catchError(() => of({} as CartItem))
        )
      ),
      toArray()
    );
  }

  getDeliveryList(): Observable<DeliveryModel[]> {
    return this.deliveryService
      .getAllDeliveryPoints()
      .pipe(catchError(() => of([])));
  }

  createOrder(order: CreateOrderDto): Observable<SuccessCreateOrder> {
    return this.ordersService.createOrder(order);
  }
}
