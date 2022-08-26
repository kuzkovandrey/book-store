import { FormControl, Validators } from '@angular/forms';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { CategoryModel, ProductModel } from '@book-store/shared/models';

@Component({
  selector: 'change-category-modal',
  templateUrl: './change-category-modal.component.html',
  styleUrls: ['./change-category-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeCategoryModalComponent {
  private categoryList: CategoryModel[] = [];

  private product: ProductModel;

  private readonly WITHOUT_CATEGORY = 'Без категории';

  categoryControl = new FormControl('', [Validators.required]);

  categoryNames: string[];

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<
      { categoryId: number | null; productId: number },
      {
        product: ProductModel;
        categoryList: CategoryModel[];
      }
    >
  ) {
    const { product, categoryList } = context.data;
    this.product = product;
    this.categoryList = categoryList;

    this.categoryNames = categoryList.map(({ name }) => name);
    this.categoryNames.push(this.WITHOUT_CATEGORY);

    this.categoryControl.setValue(
      product.category ? product.category.name : this.WITHOUT_CATEGORY
    );
  }

  changeCategory() {
    const selectedCategory = this.categoryList.find(
      ({ name }) => name === this.categoryControl.value
    );

    this.context.completeWith({
      categoryId: selectedCategory ? selectedCategory.id : null,
      productId: this.product.id,
    });
  }
}
