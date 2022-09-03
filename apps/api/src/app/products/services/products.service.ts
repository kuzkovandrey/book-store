import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository, Between, Like } from 'typeorm';

import { BookEntity } from '@books/entities';
import { ProductEntity } from '@products/entities';
import {
  BaseService,
  getArrayWithObjectId,
  getDatabaseTakeParams,
} from '@core';
import { ChangeProductValuesDto } from '@book-store/shared/dto';
import { ApiQueryParams } from '@book-store/shared/values';
import { SearchQueryParams } from '@book-store/shared/models';

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

  async getSimilarById(id: number, take = 6): Promise<ProductEntity[]> {
    const { category, book } = await this.findOneBy(
      { id },
      this.findOptionsRelations
    );

    const similar = await this.findAll({
      relations: this.findOptionsRelations,
      where: [
        {
          category: {
            id: category?.id,
          },
        },
        {
          book: {
            genre: {
              id: book.genre.id,
            },
          },
        },
      ],
      take,
    });

    return similar.filter((product) => product.id !== id);
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

  async findAllByQueryParams({
    [ApiQueryParams.GENRES]: genres,
    [ApiQueryParams.LANGS]: langs,
    [ApiQueryParams.PUBLISHER]: publishers,
    [ApiQueryParams.AUTHORS]: authors,
    [ApiQueryParams.YEAR_MIN]: yearMin,
    [ApiQueryParams.YEAR_MAX]: yearMax,
    [ApiQueryParams.PAGE]: page,
    [ApiQueryParams.PER_PAGE]: perPage,
    [ApiQueryParams.CATEGORIES]: categories,
    [ApiQueryParams.TEXT]: text,
  }: SearchQueryParams): Promise<ProductEntity[]> {
    const [skip, take] = getDatabaseTakeParams(page, perPage);

    const findAuthors =
      authors && authors.length
        ? authors.map((id) => ({
            id,
          }))
        : [];

    return await this.findAll({
      take,
      skip,
      relations: this.findOptionsRelations,
      where: {
        book: {
          ...(text ? { title: Like(`%${text}%`) } : {}),
          authors: [...findAuthors],
          language: getArrayWithObjectId(langs),
          genre: getArrayWithObjectId(genres),
          publisher: getArrayWithObjectId(publishers),
          publicationYear: Between(
            yearMin ?? 0,
            yearMax ?? new Date().getFullYear()
          ),
        },
        category: getArrayWithObjectId(categories),
      },
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
