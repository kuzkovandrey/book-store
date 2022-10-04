import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiSvgModule } from '@taiga-ui/core';

@Component({
  selector: 'product-card-button',
  standalone: true,
  imports: [CommonModule, TuiSvgModule],
  templateUrl: './product-card-button.component.html',
  styleUrls: ['./product-card-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardButtonComponent {}
