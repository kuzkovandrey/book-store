import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'category-section-skeleton, [category-section-skeleton]',
  templateUrl: './category-section-skeleton.component.html',
  styleUrls: ['./category-section-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySectionSkeletonComponent {
  @Input() itemsCount = 5;

  items = new Array(5);
}
