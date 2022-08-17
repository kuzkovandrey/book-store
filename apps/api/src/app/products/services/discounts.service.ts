import { ProductsService } from './products.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DiscountEntity, ProductEntity } from '@products/entities';
import { CreateDiscountDto } from '@book-store/shared/dto';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(DiscountEntity)
    private repository: Repository<DiscountEntity>,
    private productsService: ProductsService
  ) {}

  findAll(): Promise<DiscountEntity[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<DiscountEntity> {
    return this.repository.findOneBy({ id });
  }

  create({
    name,
    description,
    percent,
  }: CreateDiscountDto): Promise<DiscountEntity> {
    return this.repository.save({ name, description, percent });
  }

  async addDiscountByProductId(
    productId: number,
    discountId: number
  ): Promise<ProductEntity> {
    const product = await this.productsService.findById(productId);
    const discount = await this.findById(discountId);

    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    if (!discount)
      throw new HttpException('Discount not found', HttpStatus.NOT_FOUND);

    product.discount = discount;

    return product.save();
  }
}