import { ToolbarItem } from '@shared/ui';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { AuthorModel } from '@book-store/shared/models';
import { BooksService } from '@core/services';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'author-toolbar, [author-toolbar]',
  templateUrl: './author-toolbar.component.html',
  styleUrls: ['./author-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorToolbarComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  authorList: ToolbarItem[] = [];

  isLoading = true;

  constructor(
    private booksService: BooksService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.booksService
        .getAllAuthors()
        .pipe(tap(() => (this.isLoading = false)))
        .subscribe({
          next: this.setAuthors,
          error: this.hangeError,
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private setAuthors = (authorList: AuthorModel[]) => {
    this.authorList = authorList.map(({ firstName, lastName, id }) => ({
      id,
      value: `${firstName} ${lastName}`,
    }));

    this.changeDetectorRef.markForCheck();
  };

  private hangeError = () => {
    this.isLoading = false;

    this.changeDetectorRef.markForCheck();
  };
}
