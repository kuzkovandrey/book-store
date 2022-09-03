import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export type ToolbarItem = { id: number; value: string };

@Component({
  selector: 'toolbar, [toolbar]',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Input() items: ToolbarItem[];

  @Output() itemClicked = new EventEmitter<number>();

  onClickItem(id: number) {
    this.itemClicked.emit(id);
  }
}
