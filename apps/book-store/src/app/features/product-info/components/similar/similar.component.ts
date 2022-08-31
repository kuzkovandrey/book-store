import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from '@book-store/shared/models';
import { ProductsService } from '@core/services';
import { AppRoutes } from '@core/values';
import { Observable } from 'rxjs';

@Component({
  selector: 'similar, [similar]',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimilarComponent implements OnInit {
  @Input() productId: number;

  similar$: Observable<ProductModel[]>;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.similar$ = this.productsService.getSimilarById(this.productId);
  }

  navigateToProductPage(id: number) {
    this.router.navigate(['/', AppRoutes.PRODUCT, id]);
  }
}
