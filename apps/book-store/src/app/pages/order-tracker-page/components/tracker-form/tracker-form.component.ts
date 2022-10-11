import { FormControl, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'tracker-form',
  templateUrl: './tracker-form.component.html',
  styleUrls: ['./tracker-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackerFormComponent {
  @Output() trackButtonClicked = new EventEmitter<string>();

  trackerControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(36),
  ]);

  onButtonClick() {
    this.trackButtonClicked.emit(this.trackerControl.value as string);
  }
}
