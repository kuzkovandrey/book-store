import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
  Between,
} from 'typeorm';

import { BookEntity } from '@books/entities';
import { ProductEntity } from '@products/entities';
import { BaseService, getQueryArray } from '@core';
import { QueriesType } from '@products/types';
import { ChangeProductValuesDto } from '@book-store/shared/dto';

interface FindQueryOptions {
  genres: QueriesType;
  langs: QueriesType;
  publishers: QueriesType;
  yearMin: number;
  yearMax: number;
}

@Injectable()
export class ProductsService extends BaseService<ProductEntity> {
  private readonly findOptionsRelations: FindOptionsRelations<ProductEntity> = {
    discount: true,
    category: true,
    book: {
      language: true,
      publisher: true,
      genre: true,
      authors: true,
    },
  };

  constructor(
    @InjectRepository(ProductEntity)
    repository: Repository<ProductEntity>
  ) {
    super(ProductEntity.name, repository);
  }

  async getProductById(id: number): Promise<ProductEntity> {
    return this.findOneBy(
      {
        id,
      },
      this.findOptionsRelations
    );
  }

  async createBookProduct(bookEntity: BookEntity) {
    const entity = await this.create({
      book: bookEntity,
    });

    await entity.save();
  }

  private getFindOptionsByQueries(
    genres: QueriesType,
    langs: QueriesType,
    publishers: QueriesType,
    yearMin: number,
    yearMax: number
  ): FindOptionsWhere<ProductEntity> {
    return {
      book: {
        language: langs ? getQueryArray(langs).map((code) => ({ code })) : [],
        genre: genres ? getQueryArray(genres).map((name) => ({ name })) : [],
        publisher: publishers
          ? getQueryArray(publishers).map((name) => ({ name }))
          : [],
        publicationYear: Between(
          yearMin ?? 0,
          yearMax ?? new Date().getFullYear()
        ),
      },
    };
  }

  async findAllByQueryParams({
    genres,
    langs,
    publishers,
    yearMin,
    yearMax,
  }: FindQueryOptions): Promise<ProductEntity[]> {
    if (!genres && !langs && !publishers && !yearMin && !yearMax)
      return await this.findAll({
        relations: this.findOptionsRelations,
      });

    return await this.findAll({
      relations: this.findOptionsRelations,
      where: this.getFindOptionsByQueries(
        genres,
        langs,
        publishers,
        yearMin,
        yearMax
      ),
    });
  }

  async changeProductValuesById(
    id: number,
    { totalCount, onSale, cost }: ChangeProductValuesDto
  ): Promise<ProductEntity> {
    const product = await this.findOneBy({ id });

    return this.executeElseThrowIncorrectDataError(async () => {
      product.totalCount = totalCount ?? product.totalCount;
      product.onSale = onSale ?? product.onSale;
      product.cost = cost ?? product.cost;

      return await product.save();
    });
  }
}
