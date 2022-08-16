import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookEntity } from '@books/entities';
import { ProductEntity } from '@products/entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>
  ) {}

  async createBookProduct(book: BookEntity): Promise<ProductEntity> {
    return await this.repository.save({
      book,
    });
  }
}
