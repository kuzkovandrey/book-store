import { FormControl, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';

import { Model, Product, Discount, AddDiscountDto } from '@book-store/shared';

@Component({
  selector: 'change-discount-modal',
  templateUrl: './change-discount-modal.component.html',
  styleUrls: ['./change-discount-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDiscountModalComponent {
  private readonly product: Model<Product>;

  private readonly WITHOUR_DISCOUNT = 'Без скидки';

  discountList: Model<Discount>[] = [];

  discountNames: string[];

  discountControl = new FormControl('', [Validators.required]);

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<
      AddDiscountDto,
      { product: Model<Product>; discountList: Model<Discount>[] }
    >
  ) {
    this.product = context.data.product;
    this.discountList = context.data.discountList;
    this.discountNames = this.discountList.map((discount) =>
      this.prepareDiscountName(discount)
    );
    this.discountNames.push(this.WITHOUR_DISCOUNT);
    this.discountControl.setValue(
      this.product.discount
        ? this.prepareDiscountName(this.product.discount)
        : this.WITHOUR_DISCOUNT
    );
  }

  private prepareDiscountName({ name, percent }: Model<Discount>): string {
    return `${name} ${percent}%`;
  }

  private getDiscountNameFromString(name: string) {
    return name.split(' ')[0];
  }

  changeDiscount() {
    const discount = this.discountList.find(
      ({ name }) =>
        name ===
        this.getDiscountNameFromString(this.discountControl.value ?? '')
    );

    this.context.completeWith({
      productId: this.product.id,
      discountId: discount?.id ?? null,
    });
  }
}
