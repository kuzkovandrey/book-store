import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, switchMap, tap } from 'rxjs';

import { LoadingService, AlertService } from '@core/services';
import { Model, Discount, CreateDiscountDto } from '@book-store/shared';
import { ErrorMessages, AlertMessages } from 'src/app/pages/admin-panel/values';
import { ProductDiscountsService } from '@features/product';

@Component({
  selector: 'discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
})
export class DiscountsComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private readonly createDiscount$ = new Subject<CreateDiscountDto>();

  private readonly deleteDiscount$ = new Subject<number>();

  createDiscountForm: FormGroup;

  discountList: Model<Discount>[] = [];

  constructor(
    private productDiscountsService: ProductDiscountsService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.initForm();

    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.productDiscountsService
        .getAll()
        .pipe(tap(() => this.loadingService.setLoading(false)))
        .subscribe((discountList) => {
          this.discountList = discountList;
          console.log(discountList);
        })
    );

    this.subscriptions.add(
      this.createDiscount$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap((discount) =>
            this.productDiscountsService.createDiscount(discount)
          ),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.handleCreateDiscount,
          error: this.handleDeleteError.bind(ErrorMessages.CREATE_DESCOUNT),
        })
    );

    this.subscriptions.add(
      this.deleteDiscount$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap((id) => this.productDiscountsService.deleteDiscount(id)),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.handleDeleteDiscount,
          error: this.handleDeleteError.bind(ErrorMessages.DELETE_DISCOUNT),
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private handleCreateDiscount = (discount: Model<Discount>) => {
    this.discountList = [...this.discountList, discount];

    this.resetForm();

    this.showSuccessAlert(AlertMessages.SUCCESS_CREATE_DISCOUNT);
  };

  private handleDeleteDiscount = (deletedDiscount: Model<Discount>) => {
    this.discountList = this.discountList.filter(
      ({ name, description }) =>
        name !== deletedDiscount.name &&
        description !== deletedDiscount.description
    );

    this.showSuccessAlert(AlertMessages.SUCCESS_DELETE_DISCOUNT);
  };

  private handleDeleteError = (message: string) => {
    this.alertService.showError(message);
  };

  private showSuccessAlert(message: string) {
    this.alertService.showSuccess(message);
  }

  private resetForm() {
    this.createDiscountForm.reset();
    this.createDiscountForm.markAsUntouched();
  }

  private initForm() {
    this.createDiscountForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      percent: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
    });
  }

  createDiscount() {
    this.createDiscount$.next(this.createDiscountForm.value);
  }

  deleteDescount(id: number) {
    this.deleteDiscount$.next(id);
  }
}
