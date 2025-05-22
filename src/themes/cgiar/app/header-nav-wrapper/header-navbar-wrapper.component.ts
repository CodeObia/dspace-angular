import { Component } from '@angular/core';
import { HeaderNavbarWrapperComponent as BaseComponent } from '../../../../app/header-nav-wrapper/header-navbar-wrapper.component';
import {slideMobileNav} from "../../../../app/shared/animations/slide";
import {HeaderComponent} from "../header/header.component";
import {AsyncPipe} from "@angular/common";
import {ThemedNavbarComponent} from "../../../../app/navbar/themed-navbar.component";
import {TranslateModule} from "@ngx-translate/core";

/**
 * This component represents a wrapper for the horizontal navbar and the header
 */
@Component({
  selector: 'ds-header-navbar-wrapper',
  styleUrls: ['./header-navbar-wrapper.component.scss'],
  templateUrl: './header-navbar-wrapper.component.html',
  animations: [slideMobileNav],
  standalone: true,
  imports: [
    HeaderComponent,
    AsyncPipe,
    ThemedNavbarComponent,
    TranslateModule
  ]
})
export class HeaderNavbarWrapperComponent extends BaseComponent {
}
