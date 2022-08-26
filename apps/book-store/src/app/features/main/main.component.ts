import { Subscription } from 'rxjs';
import { ProductsService } from '@core/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from '@book-store/shared/models';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  productList: ProductModel[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.productsService.getAll().subscribe((productList) => {
        this.productList = productList;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
