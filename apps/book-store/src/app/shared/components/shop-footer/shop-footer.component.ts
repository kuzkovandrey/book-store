import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

import { AppRouterData } from '@core/models';

@Component({
  selector: 'shop-footer',
  templateUrl: './shop-footer.component.html',
  styleUrls: ['./shop-footer.component.scss'],
})
export class ShopFooterComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  isShown = false;

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
          this.isShown = data && data.hasFooter;
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
