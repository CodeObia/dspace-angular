import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeInOut } from '../../../../../app/shared/animations/fade';
import { FullItemPageComponent as BaseComponent } from '../../../../../app/item-page/full/full-item-page.component';
import {ItemAlertsComponent} from "../../../../custom/app/item-page/alerts/item-alerts.component";
import {AsyncPipe, KeyValuePipe} from "@angular/common";
import {VarDirective} from "../../../../../app/shared/utils/var.directive";
import {
  ItemPageTitleFieldComponent
} from "../../../../custom/app/item-page/simple/field-components/specific-field/title/item-page-title-field.component";
import {DsoEditMenuComponent} from "../../../../../app/shared/dso-page/dso-edit-menu/dso-edit-menu.component";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {
  FullFileSectionComponent
} from "../../../../custom/app/item-page/full/field-components/file-section/full-file-section.component";
import {CollectionsComponent} from "../../../../../app/item-page/field-components/collections/collections.component";
import {ErrorComponent} from "../../../../../app/shared/error/error.component";
import {LoadingComponent} from "../../../../custom/app/shared/loading/loading.component";

/**
 * This component renders a full item page.
 * The route parameter 'id' is used to request the item it represents.
 */

@Component({
  selector: 'ds-full-item-page',
  styleUrls: ['../../../../../app/item-page/full/full-item-page.component.scss'],
  templateUrl: './full-item-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOut],
  imports: [
    ItemAlertsComponent,
    AsyncPipe,
    VarDirective,
    ItemPageTitleFieldComponent,
    DsoEditMenuComponent,
    RouterLink,
    TranslateModule,
    KeyValuePipe,
    FullFileSectionComponent,
    CollectionsComponent,
    ErrorComponent,
    LoadingComponent
  ],
  standalone: true
})
export class FullItemPageComponent extends BaseComponent {

  /**
   * List of metadata fields used for the simple item page, not needed in the full item page
   */
  hiddenMetadataFields = [
    'mel.ISO3166/MA',
    'mel.ISO3166-1/ALFA3',
    'mel.iso3166-1/Numeric',
    'mel.partner.id',
    'mel.file.thumbnail',
    'mel.file.hash',
    'mel.date.year',
    'mel.licence.image',
    'mel.contact.email',
    'mel.contact.domain',
    'mel.subject.agrovoc',
  ]
}
