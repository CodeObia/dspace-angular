import {Component, OnInit} from '@angular/core';
import { HeaderComponent as BaseComponent } from '../../../../app/header/header.component';
import { Observable } from 'rxjs';
import {AsyncPipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {ThemedNavbarComponent} from "../../../../app/navbar/themed-navbar.component";
import {ContextHelpToggleComponent} from "../../../../app/header/context-help-toggle/context-help-toggle.component";
import {ImpersonateNavbarComponent} from "../../../../app/shared/impersonate-navbar/impersonate-navbar.component";
import {ThemedSearchNavbarComponent} from "../../../../app/search-navbar/themed-search-navbar.component";
import {ThemedLangSwitchComponent} from "../../../../app/shared/lang-switch/themed-lang-switch.component";
import {ThemedAuthNavMenuComponent} from "../../../../app/shared/auth-nav-menu/themed-auth-nav-menu.component";

/**
 * Represents the header with the logo and simple navigation
 */
@Component({
  selector: 'ds-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    TranslateModule,
    RouterLink,
    ThemedNavbarComponent,
    ContextHelpToggleComponent,
    ImpersonateNavbarComponent,
    ThemedSearchNavbarComponent,
    ThemedLangSwitchComponent,
    ThemedAuthNavMenuComponent,
  ]
})
export class HeaderComponent extends BaseComponent implements OnInit {
  public isNavBarCollapsed$: Observable<boolean>;

  ngOnInit() {
    super.ngOnInit();
    this.isNavBarCollapsed$ = this.menuService.isMenuCollapsed(this.menuID);
  }
}

