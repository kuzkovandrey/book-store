import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filter, Subscription } from 'rxjs';

import { User } from '@book-store/shared/models';

@Component({
  selector: 'auth-form, [auth-form]',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, OnDestroy {
  @Output() formValueChanges = new EventEmitter<User>();

  @Output() loginButtonClick = new EventEmitter<void>();

  private readonly subscriptions = new Subscription();

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.subscriptions.add(
      this.loginForm.valueChanges
        .pipe(filter(() => this.loginForm.valid))
        .subscribe((user) => {
          this.formValueChanges.emit(user as User);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onClickLoginButton() {
    this.loginButtonClick.emit();
  }
}
