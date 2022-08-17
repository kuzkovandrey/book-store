import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiscountEntity, ProductEntity } from '@products/entities';
import { ProductsService } from '@products/services';
import { DiscountsController } from './controllers/discounts.controller';
import { ProductsController } from './controllers/products.controller';
import { DiscountsService } from './services/discounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountEntity, ProductEntity])],
  providers: [ProductsService, DiscountsService],
  controllers: [ProductsController, DiscountsController],
  exports: [ProductsService],
})
export class ProductsModule {}
