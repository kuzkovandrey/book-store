import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CategoriesService } from '@products/services';
import {
  AddCategoryToProductDto,
  ApiControlles,
  CreateCategoryDto,
} from '@book-store/shared';
import { CategoryEntity, ProductEntity } from '@products/entities';
import { BaseController } from '@core/base';

@Controller(ApiControlles.CATEGORIES)
export class CategoriesController extends BaseController {
  constructor(private categoriesService: CategoriesService) {
    super(CategoriesController.name);
  }

  @Get('/')
  getAll(): Promise<CategoryEntity[]> {
    return this.categoriesService.findAll();
  }

  @Post('/')
  create(@Body() dto: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      return this.categoriesService.create(dto);
    } catch (error: unknown) {
      this.throwHttpExeption(error);
    }
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<CategoryEntity> {
    try {
      return this.categoriesService.deleteById(id);
    } catch (error: unknown) {
      this.throwHttpExeption(error);
    }
  }

  @Patch('/:id')
  changeValues(
    @Param('id') id: number,
    @Body() dto: CreateCategoryDto
  ): Promise<CategoryEntity> {
    try {
      return this.categoriesService.changeValues(id, dto);
    } catch (error: unknown) {
      this.throwHttpExeption(error);
    }
  }

  @Post(ApiControlles.ADD)
  addCategoryToProduct(
    @Body() { categoryId, productId }: AddCategoryToProductDto
  ): Promise<ProductEntity> {
    try {
      return this.categoriesService.addCategoryByProductId(
        categoryId,
        productId
      );
    } catch (error: unknown) {
      this.throwHttpExeption(error);
    }
  }
}
