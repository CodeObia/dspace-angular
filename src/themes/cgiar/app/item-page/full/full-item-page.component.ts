import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeInOut } from '../../../../../app/shared/animations/fade';
import { FullItemPageComponent as BaseComponent } from '../../../../../app/item-page/full/full-item-page.component';

/**
 * This component renders a full item page.
 * The route parameter 'id' is used to request the item it represents.
 */

@Component({
  selector: 'ds-full-item-page',
  styleUrls: ['../../../../../app/item-page/full/full-item-page.component.scss'],
  templateUrl: './full-item-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOut]
})
export class FullItemPageComponent extends BaseComponent {

  /**
   * List of metadata fields used for the simple item page, not needed in the full item page
   */
  hiddenMetadataFields = [
    'mel.subject.agrovoc',
  ]
}
