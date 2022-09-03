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
import { Observable, ReplaySubject, switchMap } from 'rxjs';

@Component({
  selector: 'similar, [similar]',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimilarComponent implements OnInit {
  private readonly id = new ReplaySubject<number>(1);

  @Input() set productId(id: number) {
    this.id.next(id);
  }

  similar$: Observable<ProductModel[]>;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.similar$ = this.id.pipe(
      switchMap((id) => this.productsService.getSimilarById(id))
    );
  }

  navigateToProductPage(id: number) {
    this.router.navigate(['/', AppRoutes.PRODUCT, id]);
  }
}
