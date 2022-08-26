import { Subscription, tap } from 'rxjs';
import { BooksService } from '@core/services';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { GenreModel } from '@book-store/shared/models';
import { ToolbarItem } from '@shared/ui';

@Component({
  selector: 'genre-toolbar, [genre-toolbar]',
  templateUrl: './genre-toolbar.component.html',
  styleUrls: ['./genre-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenreToolbarComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  genreList: ToolbarItem[] = [];

  isLoading = true;

  constructor(
    private booksService: BooksService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.booksService
        .getAllGentes()
        .pipe(tap(() => (this.isLoading = false)))
        .subscribe({
          next: this.setGenres,
          error: this.hangeError,
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private setGenres = (genreList: GenreModel[]) => {
    this.genreList = genreList.map(({ id, name: value }) => ({ id, value }));

    this.changeDetectorRef.markForCheck();
  };

  private hangeError = () => {
    this.isLoading = false;

    this.changeDetectorRef.markForCheck();
  };
}
