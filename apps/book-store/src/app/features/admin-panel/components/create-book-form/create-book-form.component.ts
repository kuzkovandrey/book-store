import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';

import { CreateBookForm } from '@features/admin-panel/types';
import { BookModel } from '@book-store/shared/models';

@Component({
  selector: 'create-book-form',
  templateUrl: './create-book-form.component.html',
  styleUrls: ['./create-book-form.component.scss'],
})
export class CreateBookFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  bookForm: FormGroup;

  @Input() initialValue: BookModel;

  @Output() valueChanges = new EventEmitter<[CreateBookForm, boolean]>();

  ngOnInit() {
    this.initForms();

    this.bookForm.valueChanges.subscribe({
      next: this.onValueChanges,
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onValueChanges = () => {
    this.valueChanges.emit([this.bookForm.value, this.bookForm.valid]);
  };

  private initForms() {
    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      genreName: new FormControl('', [Validators.required]),
      publisherName: new FormControl('', [Validators.required]),
      pageCount: new FormControl(null, [Validators.required]),
      publicationYear: new FormControl(null, [
        Validators.required,
        Validators.min(1800),
        Validators.max(new Date().getFullYear()),
      ]),
      picture: new FormControl('', [Validators.required]),
      language: new FormGroup({
        name: new FormControl('', [Validators.required]),
        code: new FormControl('', [Validators.required]),
      }),
    });

    if (this.initialValue) this.setInitialValues();
  }

  private setInitialValues() {
    const {
      title,
      description,
      genre,
      publisher,
      pageCount,
      publicationYear,
      picture,
      language,
    } = this.initialValue;

    this.bookForm.get('title')?.setValue(title);
    this.bookForm.get('description')?.setValue(description);
    this.bookForm.get('genreName')?.setValue(genre.name);
    this.bookForm.get('publisherName')?.setValue(publisher.name);
    this.bookForm.get('publicationYear')?.setValue(publicationYear);
    this.bookForm.get('publicationYear')?.setValue(publicationYear);
    this.bookForm.get('picture')?.setValue(picture);
    this.bookForm.get('pageCount')?.setValue(pageCount);
    this.bookForm.get('language')?.get('name')?.setValue(language.name);
    this.bookForm.get('language')?.get('code')?.setValue(language.code);

    this.onValueChanges();
  }
}
