import { Injectable } from '@nestjs/common';

import { MainPageSection } from '@book-store/shared';
import { CategoriesService, ProductsService } from '@products/services';
import { CategoryEntity } from '@products/entities';

@Injectable()
export class MainService {
  private readonly CATEGORY_COUNTER = 4;

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
        relations: {
          book: true,
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
}
