import { Injectable } from '@nestjs/common';

import { MainPageSection } from '@book-store/shared';
import { CategoriesService, ProductsService } from '@products/services';
import { CategoryEntity } from '@products/entities';
import { HealthServiceError } from '@core/values';

@Injectable()
export class MainService {
  private readonly CATEGORY_COUNTER = 4;

  private readonly BOOK_COUNTER = 5;

  private readonly MIN_PRODUCTS_COUNT = 10;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  private getSections(
    categoryList: CategoryEntity[]
  ): Promise<MainPageSection>[] {
    return categoryList.map(async (cat) => {
      const productList = await this.productsService.findAll({
        where: [{ category: { id: cat.id } }],
        take: this.BOOK_COUNTER,
        relations: {
          book: {
            authors: true,
          },
          discount: true,
        },
      });

      return {
        category: cat,
        productList,
      };
    });
  }

  async getMainPageSections(): Promise<MainPageSection[]> {
    const categories = await this.categoriesService.findAll({
      take: this.CATEGORY_COUNTER,
    });

    return await Promise.all(this.getSections(categories));
  }

  async hasMinProductsCount(): Promise<boolean> {
    const products = await this.productsService.findAll();

    // if (products.length < this.MIN_PRODUCTS_COUNT)
    //   throw new HealthServiceError();

    return true;
  }
}
