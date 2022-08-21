import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  isLoading$: Observable<boolean>;

  constructor(loaderService: LoadingService) {
    this.isLoading$ = loaderService.loading$;
  }
}
