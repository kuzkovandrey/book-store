import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutes } from '@core/values';

@Component({
  selector: 'service-unavailable',
  templateUrl: './service-unavailable.component.html',
  styleUrls: ['./service-unavailable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceUnavailableComponent {
  constructor(private router: Router) {}

  navigateToAdminPage() {
    this.router.navigate([AppRoutes.ADMIN]);
  }
}
