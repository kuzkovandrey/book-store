import { Component } from '@angular/core';
import { MenuRoutes } from '../../values/menu-routes.const';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  readonly routes = MenuRoutes;
}
