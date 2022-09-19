import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiControlles } from '@book-store/shared/values';
import { ProductEntity, DiscountEntity } from '@products/entities';
import { DiscountsService } from '@products/services/discounts.service';
import { AddDiscountDto, CreateDiscountDto } from '@book-store/shared/dto';
import { BaseController } from '@core/base';
import { AuthenticatedGuard } from '@auth';

@Controller(ApiControlles.DISCOUNTS)
@UseGuards(AuthenticatedGuard)
export class DiscountsController extends BaseController {
  constructor(private discountsService: DiscountsService) {
    super(DiscountsController.name);
  }

  @Get('/')
  getAll(): Promise<DiscountEntity[]> {
    return this.discountsService.findAll();
  }

  @Post(ApiControlles.ADD)
  async addDiscountToProductById(
    @Body() { discountId, productId }: AddDiscountDto
  ): Promise<ProductEntity> {
    try {
      return await this.discountsService.addDiscountByProductId(
        productId,
        discountId
      );
    } catch (error: unknown) {
      this.throwHttpExeption(error);
    }
  }

  @Post('/')
  async createDiscount(
    @Body() discount: CreateDiscountDto
  ): Promise<DiscountEntity> {
    try {
      return await this.discountsService.create(discount);
    } catch (error: unknown) {
      this.throwHttpExeption(error);
    }
  }

  @Delete('/:id')
  async deleteDiscountById(@Param('id') id: number): Promise<DiscountEntity> {
    try {
      return await this.discountsService.deleteById(id);
    } catch (error: unknown) {
      this.throwHttpExeption(error);
    }
  }
}
