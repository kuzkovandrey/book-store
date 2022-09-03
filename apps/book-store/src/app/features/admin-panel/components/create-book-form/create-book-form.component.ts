import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';

import { CreateBookForm } from '@features/admin-panel/types';

@Component({
  selector: 'create-book-form',
  templateUrl: './create-book-form.component.html',
  styleUrls: ['./create-book-form.component.scss'],
})
export class CreateBookFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  bookForm: FormGroup;

  @Output() valueChanges = new EventEmitter<[CreateBookForm, boolean]>();

  ngOnInit() {
    this.initForms();

    this.bookForm.valueChanges.subscribe((form: CreateBookForm) => {
      this.valueChanges.emit([form, this.bookForm.valid]);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
  }
}
