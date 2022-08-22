import { ProductsService } from './products.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DiscountEntity, ProductEntity } from '@products/entities';

import { BaseService } from '@core/base';

@Injectable()
export class DiscountsService extends BaseService<DiscountEntity> {
  constructor(
    @InjectRepository(DiscountEntity)
    repository: Repository<DiscountEntity>,
    private productsService: ProductsService
  ) {
    super(DiscountEntity.name, repository);
  }

  async addDiscountByProductId(
    productId: number,
    discountId: number
  ): Promise<ProductEntity> {
    const product = await this.productsService.findById(productId);
    const discount = !discountId ? null : await this.findById(discountId);

    return this.executePromiseElseThrowIncorrectDataError(async () => {
      product.discount = discount;

      return await product.save();
    });
  }
}
