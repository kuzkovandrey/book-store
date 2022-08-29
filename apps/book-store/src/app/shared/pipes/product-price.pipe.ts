import { Pipe, PipeTransform } from '@angular/core';

import { ProductModel } from '@book-store/shared/models';

@Pipe({
  name: 'productPrice',
  standalone: true,
})
export class ProductPricePipe implements PipeTransform {
  transform(product: ProductModel): string {
    return product.onSale
      ? `${this.calculatePrice(product)} руб.`
      : 'Скоро в продаже';
  }

  private calculatePrice(product: ProductModel): number {
    if (product.discount && product.discount.percent) {
      const cost = product.cost * (product?.discount.percent / 100);

      return Math.round(cost * 100) / 100;
    }

    return Math.round(product.cost * 100) / 100;
  }
}
