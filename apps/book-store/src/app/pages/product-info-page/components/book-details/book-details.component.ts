import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BookModel } from '@book-store/shared';

@Component({
  selector: 'book-details, [book-details]',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailsComponent {
  @Input() book: BookModel;

  get authors(): string {
    return this.book.authors
      .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
      .join(' ');
  }
}
