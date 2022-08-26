import { ProductsService } from './products.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity, ProductEntity } from '@products/entities';
import { BaseService } from '@core/base';
import { CreateCategoryDto } from '@book-store/shared';

@Injectable()
export class CategoriesService extends BaseService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    repository: Repository<CategoryEntity>,
    private productsService: ProductsService
  ) {
    super(CategoryEntity.name, repository);
  }

  async addCategoryByProductId(
    categoryId: number,
    productId: number
  ): Promise<ProductEntity> {
    const product = await this.productsService.findBy({ id: productId });
    const category = !categoryId ? null : await this.findBy({ id: categoryId });

    return this.executeElseThrowIncorrectDataError(async () => {
      product.category = category;

      return await product.save();
    });
  }

  async changeValues(
    id: number,
    { name }: CreateCategoryDto
  ): Promise<CategoryEntity> {
    const category = await this.findBy({ id });

    return this.executeElseThrowIncorrectDataError(async () => {
      category.name = name;

      return await category.save();
    });
  }
}
