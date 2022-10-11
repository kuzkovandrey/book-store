import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Subject, Subscription, switchMap, tap } from 'rxjs';

import { LoadingService, AlertService } from '@core/services';
import { Category, CategoryModel, CreateCategoryDto } from '@book-store/shared';
import { EditCategoryModalComponent } from 'src/app/pages/admin-panel/components';
import { ProductCategoriesService } from '@features/product';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  private getAllCategories$ = new Subject<void>();
  private createCategory$ = new Subject<string>();
  private deleteCategory$ = new Subject<number>();
  private editCategory$ = new Subject<CreateCategoryDto & { id: number }>();

  categoryList: CategoryModel[] = [];

  constructor(
    private categoriesService: ProductCategoriesService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    @Inject(TuiDialogService)
    private dialogService: TuiDialogService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.getAllCategories$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap(() => this.categoriesService.getAll()),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: (categoryList) => {
            this.categoryList = categoryList;
          },
          error: this.handleError,
        })
    );

    this.subscriptions.add(
      this.createCategory$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap((name) => this.categoriesService.createCategory({ name })),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.getAllCategories,
          error: this.handleError,
        })
    );

    this.subscriptions.add(
      this.deleteCategory$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap((id) => this.categoriesService.deleteCategory(id)),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.getAllCategories,
          error: this.handleError,
        })
    );

    this.subscriptions.add(
      this.editCategory$
        .pipe(
          tap(() => this.loadingService.setLoading(true)),
          switchMap(({ id, name }) =>
            this.categoriesService.changeCategoryValues(id, { name })
          ),
          tap(() => this.loadingService.setLoading(false))
        )
        .subscribe({
          next: this.getAllCategories,
          error: this.handleError,
        })
    );

    this.getAllCategories();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private getAllCategories = () => {
    this.getAllCategories$.next();
  };

  private handleError = (error: HttpErrorResponse) => {
    this.alertService.showError(error.message);
  };

  createCategory(name: string) {
    this.createCategory$.next(name);
  }

  deleteCategory(id: number) {
    this.deleteCategory$.next(id);
  }

  openEditModal({ id, name }: CategoryModel) {
    this.dialogService
      .open<Category & { id: number }>(
        new PolymorpheusComponent(EditCategoryModalComponent),
        {
          data: {
            id,
            name,
          },
        }
      )
      .subscribe(({ name, id }) => {
        this.editCategory$.next({ name, id });
        console.log(name);
      });
  }
}
