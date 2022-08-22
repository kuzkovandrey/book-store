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
import { getQueryArray } from '@core';
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
export class ProductsService {
  private readonly findOptionsRelations: FindOptionsRelations<ProductEntity> = {
    discount: true,
    book: {
      language: true,
      publisher: true,
      genre: true,
      authors: true,
    },
  };

  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>
  ) {}

  async createBookProduct(book: BookEntity): Promise<ProductEntity> {
    // const product = this.repository.create();
    // product.book = book;

    // return product.save();

    return await this.repository.save({
      book,
    });
  }

  findAll(): Promise<ProductEntity[]> {
    return this.repository.find({
      relations: this.findOptionsRelations,
    });
  }

  findById(id: number): Promise<ProductEntity> {
    return this.repository.findOneBy({ id });
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

  findAllByQueryParams({
    genres,
    langs,
    publishers,
    yearMin,
    yearMax,
  }: FindQueryOptions): Promise<ProductEntity[]> {
    if (!genres && !langs && !publishers && !yearMin && !yearMax)
      return this.findAll();

    return this.repository.find({
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
    const product = await this.repository.findOneBy({ id });

    product.totalCount = totalCount ?? product.totalCount;
    product.onSale = onSale ?? product.onSale;
    product.cost = cost ?? product.cost;

    return product.save();
  }
}
