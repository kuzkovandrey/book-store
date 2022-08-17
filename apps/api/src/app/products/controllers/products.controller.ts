import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';

import { ProductsService } from '@products/services/products.service';
import { ApiControlles } from '@book-store/shared/values';
import { ApiQueryParams } from '@book-store/shared/values';
import { ProductEntity } from '@products/entities';
import { QueriesType } from '@products/types';
import { ChangeProductValuesDto } from '@book-store/shared/dto';

@Controller(ApiControlles.PRODUCTS)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

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

  @Get('/:id')
  getProductById(@Param('id') id: number): Promise<ProductEntity> {
    return this.productsService.findById(id);
  }

  @Patch('/:id')
  changeProductValuesById(
    @Param('id') id: number,
    @Body() changes: ChangeProductValuesDto
  ) {
    return this.productsService.changeProductValuesById(id, changes);
  }
}
