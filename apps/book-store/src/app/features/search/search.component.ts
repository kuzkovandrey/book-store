import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchBarService } from './services/search-bar.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  constructor(private searchBarService: SearchBarService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.searchBarService.search$.subscribe((v) => {
        console.log(v);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
