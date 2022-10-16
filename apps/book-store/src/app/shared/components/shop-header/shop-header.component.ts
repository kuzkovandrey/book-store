import { filter, Subscription, map } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { AppRouterData } from '@core/models';
import { AppRoutes, MenuRoutes } from '@core/values';

@Component({
  selector: 'shop-header',
  templateUrl: './shop-header.component.html',
  styleUrls: ['./shop-header.component.scss'],
})
export class ShopHeaderComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  readonly menuRoutes = MenuRoutes;

  hasHeader = false;

  isShowNavBar = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.subscriptions.add(
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          map(
            () => this.activatedRoute.firstChild?.snapshot.data as AppRouterData
          )
        )
        .subscribe((data) => {
          this.hasHeader = data && data.hasHeader;
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  navigateToMainPage() {
    this.router.navigate([AppRoutes.MAIN]);
  }

  openNavBar() {
    console.log('asfasf');
    this.isShowNavBar = true;
  }

  closeNavBar() {
    this.isShowNavBar = false;
  }
}
