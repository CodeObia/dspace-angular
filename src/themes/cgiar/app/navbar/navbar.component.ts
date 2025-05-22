import { Component } from '@angular/core';
import { NavbarComponent as BaseComponent } from '../../../../app/navbar/navbar.component';
import { slideMobileNav } from '../../../../app/shared/animations/slide';
import {AsyncPipe, NgClass, NgComponentOutlet} from "@angular/common";
import {ThemedUserMenuComponent} from "../../../../app/shared/auth-nav-menu/user-menu/themed-user-menu.component";

/**
 * Component representing the public navbar
 */
@Component({
  selector: 'ds-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html',
  animations: [slideMobileNav],
  standalone: true,
  imports: [
    AsyncPipe,
    ThemedUserMenuComponent,
    NgClass,
    NgComponentOutlet
  ]
})
export class NavbarComponent extends BaseComponent {
}
