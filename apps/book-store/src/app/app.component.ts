import { LoadingService } from '@core/services/loading.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'book-store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.loading$;
  }
}
