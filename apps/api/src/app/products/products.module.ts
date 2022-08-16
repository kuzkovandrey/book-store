import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiscountEntity, ProductEntity } from '@products/entities';
import { ProductsService } from '@products/services';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountEntity, ProductEntity])],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
