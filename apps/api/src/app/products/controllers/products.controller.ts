import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';

import { ProductsService } from '@products/services/products.service';
import { ApiControlles } from '@book-store/shared/values';
import { ApiQueryParams } from '@book-store/shared/values';
import { ProductEntity } from '@products/entities';
import { QueriesType } from '@products/types';
import { ChangeProductValuesDto } from '@book-store/shared/dto';
import { BaseController } from '@core/base';

@Controller(ApiControlles.PRODUCTS)
export class ProductsController extends BaseController {
  constructor(private productsService: ProductsService) {
    super(ProductsController.name);
  }

  @Get('/')
  getAllProducts(
    @Query(ApiQueryParams.GENRES) genres: QueriesType,
    @Query(ApiQueryParams.LANGS) langs: QueriesType,
    @Query(ApiQueryParams.PUBLISHER) publishers: QueriesType,
    @Query(ApiQueryParams.YEAR_MIN) yearMin: number,
    @Query(ApiQueryParams.YEAR_MAX) yearMax: number
  ): Promise<ProductEntity[]> {
    return this.productsService.findAllByQueryParams({
      genres,
      langs,
      publishers,
      yearMin,
      yearMax,
    });
  }

  @Get(ApiControlles.SIMILAR)
  async getSimilarById(
    @Query(ApiQueryParams.ID) id: number,
    @Query(ApiQueryParams.COUNT) count: number
  ): Promise<ProductEntity[]> {
    console.log('Query ID', id);

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
}
