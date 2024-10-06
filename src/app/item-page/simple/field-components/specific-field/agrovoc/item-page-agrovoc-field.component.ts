import { Component } from '@angular/core';

import { ItemPageMetadataSearchLinkFieldComponent } from '../metadata-search-link/item-page-metadata-search-link-field.component';

@Component({
  selector: 'ds-item-page-agrovoc',
  styleUrls: ['./item-page-agrovoc-field.component.scss'],
  templateUrl: './item-page-agrovoc-field.component.html'
})
/**
 * This component renders a Discovery search link for a metadata value in addition to link to AGROVOC.
 * It expects 4 parameters: The item, a separator, the metadata keys and an i18n key
 */
export class ItemPageAgrovocFieldComponent extends ItemPageMetadataSearchLinkFieldComponent {

  /**
   * Helper function split the link from the keyword
   * @type {string}
   */
  splitLink(metadataValue: string) {
    const split = metadataValue.split(' | ');
    return {
      keyword: split[0],
      link: split[1]
    }
  }
}
