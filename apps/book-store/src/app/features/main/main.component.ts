import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MainPageSection } from '@book-store/shared';
import { MainService } from '@features/main/services/main.service';
import { AppRoutes } from '@core/values';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  sections: MainPageSection[] = [];

  skeletonSections = new Array(3);

  constructor(private mainService: MainService, private router: Router) {}

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

  navigateToSearchPage() {
    this.router.navigate([AppRoutes.SEARCH]);
  }
}
