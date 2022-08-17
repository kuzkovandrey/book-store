import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

import { ApiControlles } from '@book-store/shared/values';
import { ProductEntity, DiscountEntity } from '@products/entities';
import { DiscountsService } from '@products/services/discounts.service';
import { AddDiscountDto, CreateDiscountDto } from '@book-store/shared/dto';

@Controller(ApiControlles.DISCOUNTS)
export class DiscountsController {
  constructor(private discountsService: DiscountsService) {}

  @Post(ApiControlles.ADD)
  addDiscountToProductById(
    @Body() { discountId, productId }: AddDiscountDto
  ): Promise<ProductEntity> {
    return this.discountsService.addDiscountByProductId(productId, discountId);
  }

  @Post('/')
  createDiscount(@Body() discount: CreateDiscountDto): Promise<DiscountEntity> {
    return this.discountsService.create(discount);
  }

  @Delete('/:id')
  deleteDiscountById(@Param('id') id: number): Promise<DiscountEntity> {
    return this.discountsService.deleteById(id);
  }
}
