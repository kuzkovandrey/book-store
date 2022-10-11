import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from '@products/services/products.service';
import { ApiControlles } from '@book-store/shared/values';
import { ApiQueryParams } from '@book-store/shared/values';
import { ProductEntity } from '@products/entities';
import { ChangeProductValuesDto } from '@book-store/shared/dto';
import { BaseController } from '@core/base';
import { SearchParams } from '@products/utils/search.decorator';
import { SearchQueryParams } from '@book-store/shared/models';
import { AuthenticatedGuard } from '@auth';

@Controller(ApiControlles.PRODUCTS)
export class ProductsController extends BaseController {
  constructor(private productsService: ProductsService) {
    super(ProductsController.name);
  }

  @Get()
  getAll(): Promise<ProductEntity[]> {
    return this.productsService.getAllProducts();
  }

  @Get(ApiControlles.BY_CATEGORY)
  getProductsByCategoryId(
    @Query(ApiQueryParams.ID) id: number,
    @Query(ApiQueryParams.TAKE) take?: number
  ): Promise<ProductEntity[]> {
    return this.productsService.getProductsByCategoryId(id, take);
  }

  @Get(ApiControlles.SEARCH)
  search(
    @SearchParams({ page: 1, perPage: 25 })
    searchParams: SearchQueryParams
  ): Promise<ProductEntity[]> {
    return this.productsService.findAllByQueryParams({
      ...searchParams,
    });
  }

  @Get(ApiControlles.SIMILAR)
  async getSimilarById(
    @Query(ApiQueryParams.ID) id: number,
    @Query(ApiQueryParams.COUNT) count: number
  ): Promise<ProductEntity[]> {
    return await this.productsService.getSimilarById(id, count);
  }

  @Get('/:id')
  async getProductById(@Param('id') id: number): Promise<ProductEntity> {
    try {
      return await this.productsService.getProductById(id);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }

  @Patch('/:id')
  @UseGuards(AuthenticatedGuard)
  async changeProductValuesById(
    @Param('id') id: number,
    @Body() changes: ChangeProductValuesDto
  ) {
    try {
      return await this.productsService.changeProductValuesById(id, changes);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }

  @Delete('/:id')
  @UseGuards(AuthenticatedGuard)
  async deleteById(@Param('id') id: number) {
    try {
      return await this.productsService.deleteById(id);
    } catch (e) {
      this.throwHttpExeption(e);
    }
  }
}
