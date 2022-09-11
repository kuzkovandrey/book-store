import { Pipe, PipeTransform } from '@angular/core';

import { ProductModel } from '@book-store/shared/models';
import { ProductPriceService } from '@core/services';

@Pipe({
  name: 'productPrice',
  standalone: true,
})
export class ProductPricePipe implements PipeTransform {
  private calculatePrice: (product: ProductModel, count: number) => number;

  constructor() {
    const productPriceService = new ProductPriceService();

    this.calculatePrice =
      productPriceService.calculatePrice.bind(productPriceService);
  }

  transform(product: ProductModel, count: number = 1): string {
    return product.onSale
      ? `${this.calculatePrice(product, count)} руб.`
      : 'Скоро в продаже';
  }
}
