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
import {
  BaseService,
  getArrayWithObjectId,
  getDatabaseTakeParams,
} from '@core';
import { ChangeProductValuesDto } from '@book-store/shared/dto';
import { SearchQueryParams } from '@products/utils/search.decorator';
import { ApiQueryParams } from '@book-store/shared/values';

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

  async findAllByQueryParams(
    params: Partial<SearchQueryParams>
  ): Promise<ProductEntity[]> {
    if (!Object.keys(params).length)
      return await this.findAll({
        relations: this.findOptionsRelations,
      });

    const {
      [ApiQueryParams.GENRES]: genres,
      [ApiQueryParams.LANGS]: langs,
      [ApiQueryParams.PUBLISHER]: publishers,
      [ApiQueryParams.YEAR_MIN]: yearMin,
      [ApiQueryParams.YEAR_MAX]: yearMax,
      [ApiQueryParams.PAGE]: page,
      [ApiQueryParams.PER_PAGE]: perPage,
    } = params;

    const [skip, take] = getDatabaseTakeParams(page, perPage);

    return await this.findAll({
      take,
      skip,
      relations: this.findOptionsRelations,
      where: {
        book: {
          language: getArrayWithObjectId(langs),
          genre: getArrayWithObjectId(genres),
          publisher: getArrayWithObjectId(publishers),
          publicationYear: Between(
            yearMin ?? 0,
            yearMax ?? new Date().getFullYear()
          ),
        },
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
