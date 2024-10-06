import { Component, Inject, Input, OnInit } from '@angular/core';

import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';
import { HttpClient } from '@angular/common/http';
import { BrowseDefinitionDataService } from '../../../../../core/browse/browse-definition-data.service';
import { APP_CONFIG, AppConfig } from '../../../../../../config/app-config.interface';

@Component({
  selector: 'ds-item-page-partners-logos-field',
  styleUrls: ['./item-page-partners-logos-field.component.scss'],
  templateUrl: './item-page-partners-logos-field.component.html'
})
/**
 * This component renders partners logos.
 * It expects 3 parameters: The item, the metadata keys and an i18n key
 */
export class ItemPagePartnersLogosFieldComponent extends ItemPageFieldComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
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
   * Fields (schema.element.qualifier) used to render their values.
   */
  @Input() fields: string[];

  /**
   * Label i18n key for the rendered metadata
   */
  @Input() label: string;

  partnersLogos: string[];

  ngOnInit() {
    const partnerIds = this.item?.allMetadata(this.fields).map(metadata => metadata.value);
    if (partnerIds.length > 0) {
      this.httpClient
        .get(`${this.appConfig.stats.PartnersLogosNameSpace}${partnerIds.join(',')}`)
        .subscribe({
          next: (data: any) => {
            this.partnersLogos = data.data.map((partner: any) => partner.logo);
          },
          error: (error) => {
            console.log('error => ', error)
          },
        });
    }
  }
}
