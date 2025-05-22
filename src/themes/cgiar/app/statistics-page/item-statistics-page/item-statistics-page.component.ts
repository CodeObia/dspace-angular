import { Component, OnInit } from '@angular/core';
import { ItemStatisticsPageComponent as BaseComponent } from '../../../../../app/statistics-page/item-statistics-page/item-statistics-page.component';
import {VarDirective} from "../../../../../app/shared/utils/var.directive";
import {AsyncPipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ItemStatisticsComponent} from "../../../../../app/shared/item-statistics/item-statistics.component";

@Component({
  selector: 'ds-item-statistics-page',
  styleUrls: ['./item-statistics-page.component.scss'],
  templateUrl: './item-statistics-page.component.html',
  standalone: true,
  imports: [
    VarDirective,
    AsyncPipe,
    TranslateModule,
    ItemStatisticsComponent
  ]
})

/**
 * Component representing the statistics page for an item.
 */
export class ItemStatisticsPageComponent extends BaseComponent implements OnInit {
  async ngOnInit() {
    this.scope$ = this.getScope$();
  }
}

