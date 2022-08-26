import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiscountEntity, ProductEntity } from '@products/entities';
import { ProductsService } from '@products/services';
import { CategoriesController } from './controllers/categories.controller';
import { DiscountsController } from './controllers/discounts.controller';
import { ProductsController } from './controllers/products.controller';
import { CategoryEntity } from './entities/category.entity';
import { CategoriesService } from './services/categories.service';
import { DiscountsService } from './services/discounts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiscountEntity, ProductEntity, CategoryEntity]),
  ],
  providers: [ProductsService, DiscountsService, CategoriesService],
  controllers: [ProductsController, DiscountsController, CategoriesController],
  exports: [ProductsService, CategoriesService],
})
export class ProductsModule {}
