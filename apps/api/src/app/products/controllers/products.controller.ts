import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ProductsService } from '@products/services/products.service';
import { ApiControlles } from '@book-store/shared/values';
import { ApiQueryParams } from '@book-store/shared/values';
import { ProductEntity } from '@products/entities';
import { QueriesType } from '@products/types';
import {
  ChangeProductValuesDto,
  ToggleProductSalesStateDto,
} from '@book-store/shared/dto';

@Controller(ApiControlles.PRODUCTS)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get(ApiControlles.ROOT)
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

  @Post(`${ApiControlles.TOGGLE_SALES_STATE}/:id`)
  toggleProductSalesStateById(
    @Param('id') id: number,
    @Body() { onSale }: ToggleProductSalesStateDto
  ) {
    return this.productsService.toggleProductSalesStateById(id, onSale);
  }

  @Patch(`${ApiControlles.ROOT}/:id`)
  changeProductValuesById(
    @Param('id') id: number,
    @Body() changes: ChangeProductValuesDto
  ) {
    return this.productsService.changeProductValuesById(id, changes);
  }
}
