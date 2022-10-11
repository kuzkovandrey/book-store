import { Injectable } from '@angular/core';
import { ProductModel } from '@book-store/shared/models';
import { CartService } from '@features/cart';
import { ProductsService } from '@features/product';
import { Observable } from 'rxjs';

@Injectable()
export class ProductInfoPageFacade {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService
  ) {}

  hasProductInCart(id: number): boolean {
    return this.cartService.hasItemInCart(id);
  }

  getProduct(id: number): Observable<ProductModel> {
    return this.productsService.getProductById(id);
  }

  handleCartButtonClick({ id }: ProductModel) {
    if (this.hasProductInCart(id)) {
      this.cartService.removeItemFromCart(id);
      return;
    }

    this.cartService.appendItemToCart({
      id,
      count: 1,
    });
  }
}
