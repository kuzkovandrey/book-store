import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

import { BooksService, LoadingService, AlertService } from '@core/services';
import { AppRoutes } from '@core/values';
import { Author, BookModel, CreateBookDto } from '@book-store/shared';
import {
  CreateBookForm,
  BookCreationType,
  EditBookState,
} from '@features/admin-panel/types';
import { AlertMessages, ErrorMessages } from '@features/admin-panel/values';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private authors: Author[] = [];

  private bookForm: CreateBookForm;

  get hasAuthors(): boolean {
    return !!this.authors.length;
  }

  get title(): string {
    return this.bookCreationType === 'create'
      ? 'Добавить новую книгу'
      : 'Редактировать книгу';
  }

  get buttonText(): string {
    return this.bookCreationType === 'create' ? 'Добавить книгу' : 'Изменить';
  }

  isValidBookForm = false;

  bookCreationType: BookCreationType = 'create';

  editableBook: BookModel;

  constructor(
    private booksService: BooksService,
    private loadingService: LoadingService,
    private router: Router,
    private alertService: AlertService
  ) {
    const state = this.router.getCurrentNavigation()?.extras
      ?.state as EditBookState;

    if (state && state.book) {
      this.bookCreationType = 'edit';
      this.editableBook = state.book;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBookFormChanges([form, isValid]: [CreateBookForm, boolean]) {
    this.bookForm = form;
    this.isValidBookForm = isValid;
  }

  onAuthorListChanges(authors: Author[]) {
    this.authors = authors;
  }

  private handleSuccesCreation = () => {
    this.alertService.showSuccess(
      this.bookCreationType === 'create'
        ? AlertMessages.SUCCESS_CREATE_BOOK
        : AlertMessages.SUCCESS_EDIT_BOOK
    );

    this.router.navigate([AppRoutes.ADMIN, AppRoutes.PRODUCTS]);
  };

  private handleCreateBookError = ({ status }: HttpErrorResponse) => {
    this.loadingService.setLoading(false);
    this.alertService.showError(
      `${ErrorMessages.CREATE_BOOK_ERROR}. Статус ${status}`
    );
  };

  private strategy(): Observable<BookModel> {
    const book = {
      ...this.bookForm,
      authors: this.authors,
    };

    return this.bookCreationType === 'create'
      ? this.booksService.createBook(book as CreateBookDto)
      : this.booksService.changeBookValues(
          this.editableBook.id,
          book as CreateBookDto
        );
  }

  onClickButton() {
    this.loadingService.setLoading(true);

    this.strategy()
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.loadingService.setLoading(false);
        })
      )
      .subscribe({
        next: this.handleSuccesCreation,
        error: this.handleCreateBookError,
      });
  }
}
