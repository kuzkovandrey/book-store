import { Component } from '@angular/core';

import { MenuRoutes } from 'src/app/pages/admin-panel/values';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  readonly routes = MenuRoutes;
}
