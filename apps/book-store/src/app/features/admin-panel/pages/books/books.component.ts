import { LoadingService } from '@core/services';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CreateBookDto } from '@book-store/shared/dto';
import { Author } from '@book-store/shared/models';
import { CreateBookForm } from '@features/admin-panel/components/create-book-form/create-book-form.component';
import { BooksService } from '@core/services/entities/books.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { AppRoutes } from '@core/values';

@Component({
  selector: 'book-store-books',
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

  isValidBookForm = false;

  constructor(
    private booksService: BooksService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private navigateToProductsPage = () => {
    this.router.navigate([AppRoutes.ADMIN, AppRoutes.PRODUCTS]);
  };

  private handleCreateBookError = () => {
    this.loadingService.setLoading(false);
  };

  onBookFormChanges([form, isValid]: [CreateBookForm, boolean]) {
    this.bookForm = form;
    this.isValidBookForm = isValid;
    console.log(form);
  }

  onAuthorListChanges(authors: Author[]) {
    this.authors = authors;
    console.log(authors);
  }

  createBook() {
    this.loadingService.setLoading(true);

    this.booksService
      .createBook({
        ...this.bookForm,
        authors: this.authors,
      } as CreateBookDto)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.loadingService.setLoading(false);
        })
      )
      .subscribe({
        next: this.navigateToProductsPage,
        error: this.handleCreateBookError,
      });
  }
}
