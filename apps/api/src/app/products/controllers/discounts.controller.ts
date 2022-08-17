import { Body, Controller, Param, Post } from '@nestjs/common';

import { ApiControlles } from '@book-store/shared/values';
import { ProductEntity } from '@products/entities';
import { DiscountsService } from '@products/services/discounts.service';
import { AddDiscountDto, CreateDiscountDto } from '@book-store/shared/dto';

@Controller(ApiControlles.DISCOUNTS)
export class DiscountsController {
  constructor(private discountsService: DiscountsService) {}

  @Post(`${ApiControlles.ADD}/:id`)
  addDiscountByProductId(
    @Param('id') productId: number,
    @Body() { discountId }: AddDiscountDto
  ): Promise<ProductEntity> {
    return this.discountsService.addDiscountByProductId(productId, discountId);
  }

  @Post(ApiControlles.ROOT)
  createDiscount(@Body() discount: CreateDiscountDto) {
    return this.discountsService.create(discount);
  }
}
