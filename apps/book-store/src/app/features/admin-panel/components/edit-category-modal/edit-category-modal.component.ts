import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { Category } from '@book-store/shared';

@Component({
  selector: 'edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCategoryModalComponent {
  category: Category & { id: number };

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialogContext<
      Category & { id: number },
      Category & { id: number }
    >
  ) {
    this.category = this.context.data;
  }

  onClickButton(name: string) {
    this.context.completeWith({
      id: this.category.id,
      name,
    });
  }
}
