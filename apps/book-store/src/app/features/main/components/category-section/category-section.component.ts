import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MainPageSection, ProductModel } from '@book-store/shared';
import { AppRoutes } from '@core/values';

@Component({
  selector: 'category-section, [category-section]',
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySectionComponent {
  @Input() section: MainPageSection;

  get title(): string {
    return this.section.category.name;
  }

  get productList(): ProductModel[] {
    return this.section.productList;
  }

  constructor(private router: Router) {}

  navigateToSearchPage() {
    this.router.navigate([AppRoutes.SEARCH], {
      state: {
        categoryId: this.section.category.id,
      },
    });
  }

  navigateToProductPage(id: number) {
    this.router.navigate([AppRoutes.PRODUCT, id]);
  }
}
