import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { ChangeProductValuesDto, Product, Model } from '@book-store/shared';
import { ProductSaleStates } from 'src/app/pages/admin-panel/values';

@Component({
  selector: 'product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent implements OnInit {
  private product: Model<Product>;

  productSaleStates = [ProductSaleStates.SALE_ON, ProductSaleStates.SALE_OFF];

  editProductForm: FormGroup;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<
      ChangeProductValuesDto,
      { product: Model<Product> }
    >
  ) {
    this.product = context.data.product;
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.editProductForm = new FormGroup({
      onSale: new FormControl(
        this.product.onSale
          ? ProductSaleStates.SALE_ON
          : ProductSaleStates.SALE_OFF,
        [Validators.required]
      ),
      totalCount: new FormControl(this.product.totalCount, [
        Validators.required,
      ]),
      cost: new FormControl(this.product.cost, [Validators.required]),
    });
  }

  changeProductValues() {
    this.context.completeWith({
      id: this.product.id,
      ...this.editProductForm.value,
      onSale:
        this.editProductForm.value.onSale === ProductSaleStates.SALE_ON
          ? true
          : false,
    });
  }
}
