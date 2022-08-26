import { Subscription } from 'rxjs';
import { ProductsService } from '@core/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainPageSection, ProductModel } from '@book-store/shared';
import { MainService } from '@features/main/services/main.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  sections: MainPageSection[] = [];

  skeletonSections = new Array(3);

  constructor(
    private productsService: ProductsService,
    private mainService: MainService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.mainService.getMainPageSecrions().subscribe((sections) => {
        this.sections = sections;
        console.log(sections);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
