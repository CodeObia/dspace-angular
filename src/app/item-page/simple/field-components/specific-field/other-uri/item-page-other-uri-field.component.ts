import {Component, Inject, Input} from '@angular/core';

import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';
import { APP_CONFIG, AppConfig } from '../../../../../../config/app-config.interface';
import { BrowseDefinitionDataService } from '../../../../../core/browse/browse-definition-data.service';

@Component({
  selector: 'ds-item-page-other-uri-field',
  templateUrl: './item-page-other-uri-field.component.html'
})
/**
 * This component can be used to represent any uri on a simple item page.
 * It expects 4 parameters: The item, a separator, the metadata keys and an i18n key
 */
export class ItemPageOtherUriFieldComponent extends ItemPageFieldComponent {
  constructor(
    protected browseDefinitionDataService: BrowseDefinitionDataService,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {
    super(browseDefinitionDataService);
  }

  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  /**
   * Separator string between multiple values of the metadata fields defined
   * @type {string}
   */
  @Input() separator: string;

  /**
   * Fields (schema.element.qualifier) used to render their values.
   */
  @Input() fields: string[];

  /**
   * Label i18n key for the rendered metadata
   */
  @Input() label: string;

  getMdValues() {
    return this.item?.allMetadata(this.fields).filter(value => !value.value.startsWith(this.appConfig.fileDownload.fileDownloadBaseUrl));
  }
}
