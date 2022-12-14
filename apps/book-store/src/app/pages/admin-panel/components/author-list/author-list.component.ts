import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Author } from '@book-store/shared';

@Component({
  selector: 'author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorListComponent implements OnInit {
  authors: Array<Author> = [];

  authorForm: FormGroup;

  @Output() authorListChanges = new EventEmitter<Array<Author>>();

  @Input() set initialValues(authors: Array<Author> | undefined) {
    if (!authors) return;

    this.authors = [...authors];
    this.authorListChanges.emit(this.authors);
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.authorForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    });
  }

  private resetForm() {
    this.authorForm.reset();
    this.authorForm.markAsUntouched();
  }

  addAuthor() {
    this.authors.push(
      new Author(
        this.authorForm.value.firstName,
        this.authorForm.value.lastName
      )
    );

    this.authorListChanges.emit(this.authors);

    this.resetForm();
  }

  removeAuthor(id: number) {
    this.authors.splice(id, 1);
    this.authorListChanges.emit(this.authors);
  }
}
