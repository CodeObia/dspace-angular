import { Component, Input } from '@angular/core';

import { ItemPageFieldComponent } from '../item-page-field.component';
import { Item } from '../../../../../core/shared/item.model';

@Component({
  selector: 'ds-item-page-statistics',
  styleUrls: ['./item-page-statistics-field.component.scss'],
  templateUrl: './item-page-statistics-field.component.html'
})
/**
 * This component renders a statistics (views and downloads) chart.
 * It expects 4 parameters: The item, an i18n key for views and an i18n key for downloads and a flag to render the widget
 */
export class ItemPageStatisticsFieldComponent extends ItemPageFieldComponent {

  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  /**
   * Label i18n key for views
   */
  @Input() labelViews: string;

  /**
   * Label i18n key for downloads
   */
  @Input() labelDownloads: string;

  /**
   * To render the widget
   */
  @Input() widget = true;
}

