import { Injectable } from '@angular/core';
import { ProductModel } from '@book-store/shared/models';

@Injectable({
  providedIn: 'root',
})
export class ProductPriceService {
  calculatePrice(product: ProductModel, count = 1): number {
    if (product.discount && product.discount.percent) {
      const cost = product.cost * (product?.discount.percent / 100);

      return this.round(cost * count);
    }

    return this.round(product.cost * count);
  }

  calculateTotalPrice(productList: { product: ProductModel; count: number }[]) {
    const totalPrice = productList.reduce((totalCount, { product, count }) => {
      return totalCount + this.calculatePrice(product, count);
    }, 0);

    return this.round(totalPrice);
  }

  private round(cost: number): number {
    return Math.round(cost * 100) / 100;
  }
}
