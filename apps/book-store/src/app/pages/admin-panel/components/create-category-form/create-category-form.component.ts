import { FormControl, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'create-category-form, [create-category-form]',
  templateUrl: './create-category-form.component.html',
  styleUrls: ['./create-category-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCategoryFormComponent implements OnInit {
  categoryNameControl: FormControl;

  @Input() buttonText: 'Добавить' | 'Изменить' = 'Добавить';

  @Input() initialState: string;

  @Output() createCategory = new EventEmitter<string>();

  ngOnInit() {
    this.categoryNameControl = new FormControl(this.initialState ?? '', [
      Validators.required,
      Validators.minLength(3),
    ]);
  }

  onCreationButtonClick() {
    this.createCategory.emit(this.categoryNameControl.value);
    this.categoryNameControl.reset();
    this.categoryNameControl.markAsUntouched();
  }
}
