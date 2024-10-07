import { Component } from '@angular/core';
import {listableObjectComponent} from 'src/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ViewMode } from 'src/app/core/shared/view-mode.model';
import {ItemSearchResult} from 'src/app/shared/object-collection/shared/item-search-result.model';
import {
  ItemSearchResultListElementComponent as BaseComponent
} from 'src/app/shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component';
import { Context } from 'src/app/core/shared/context.model';

@listableObjectComponent('PublicationSearchResult', ViewMode.ListElement, Context.Any, 'cgiar')
@listableObjectComponent(ItemSearchResult, ViewMode.ListElement, Context.Any, 'cgiar')
@Component({
  selector: 'ds-item-search-result-list-element',
  styleUrls: [
    '../../../../../../../../../app/shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component.scss',
    './item-search-result-list-element.component.scss'
  ],
  templateUrl: './item-search-result-list-element.component.html',
})
export class ItemSearchResultListElementComponent extends BaseComponent {

  /**
   * Helper function to generate search params for the metadata value using its
   * Discovery index.
   * @type {string}
   */
  generateSearchParams(metadataValue: string, discoveryIndex: string) {
    const searchFilter = 'f.' + discoveryIndex;
    const searchValue = metadataValue + ',equals';

    // Note the special syntax for searchFilter, since we want to use the
    // string value of the searchFilter variable as the object key, not a
    // literal "searchFilter".
    return { [searchFilter]: searchValue };
  }
}
