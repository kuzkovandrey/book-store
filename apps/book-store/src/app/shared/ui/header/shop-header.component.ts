import { FormControl } from '@angular/forms';
import { filter, Subscription, map } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AppRouterData } from '@core/models';
import { SearchBarService } from './services';

@Component({
  selector: 'shop-header',
  templateUrl: './shop-header.component.html',
  styleUrls: ['./shop-header.component.scss'],
})
export class ShopHeaderComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  isShown = true;

  searchInput = new FormControl('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private searchBarService: SearchBarService
  ) {}

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
          this.isShown = data && data.hasHeader;
        })
    );

    this.subscriptions.add(
      this.searchInput.valueChanges.subscribe((value) => {
        this.searchBarService.setText(value);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
