import {ChangeDetectionStrategy, Component, Inject, Input, OnInit} from '@angular/core';
import { Item } from '../../../../../../../app/core/shared/item.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import {
  listableObjectComponent
} from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { Context } from '../../../../../../../app/core/shared/context.model';
import {
  UntypedItemComponent as BaseComponent
} from '../../../../../../../app/item-page/simple/item-types/untyped-item/untyped-item.component';
import { APP_CONFIG, AppConfig } from '../../../../../../../config/app-config.interface';
import { RouteService } from '../../../../../../../app/core/services/route.service';
import {Router, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AsyncPipe} from "@angular/common";
import {
  ResultsBackButtonComponent
} from "../../../../../../custom/app/shared/results-back-button/results-back-button.component";
import {MiradorViewerComponent} from "../../../../../../../app/item-page/mirador-viewer/mirador-viewer.component";
import {
  ItemPageTitleFieldComponent
} from "../../../../../../custom/app/item-page/simple/field-components/specific-field/title/item-page-title-field.component";
import {DsoEditMenuComponent} from "../../../../../../../app/shared/dso-page/dso-edit-menu/dso-edit-menu.component";
import {
  ItemPageSocialShareComponent
} from "../../../../../../../app/item-page/simple/field-components/specific-field/social-share/item-page-social-share.component";
import {
  ItemPageAltmetricFieldComponent
} from "../../../../../../../app/item-page/simple/field-components/specific-field/altmetric/item-page-altmetric-field.component";
import {
  ItemPageDimensionsFieldComponent
} from "../../../../../../../app/item-page/simple/field-components/specific-field/dimensions/item-page-dimensions-field.component";
import {
  ItemPageStatisticsFieldComponent
} from "../../../../../../../app/item-page/simple/field-components/specific-field/statistics/item-page-statistics-field.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {
  MetadataFieldWrapperComponent
} from "../../../../../../../app/shared/metadata-field-wrapper/metadata-field-wrapper.component";
import {ThumbnailComponent} from "../../../../../../custom/app/thumbnail/thumbnail.component";
import {MediaViewerComponent} from "../../../../../../custom/app/item-page/media-viewer/media-viewer.component";
import {TranslateModule} from "@ngx-translate/core";
import {
  FileSectionComponent
} from "../../../../../../custom/app/item-page/simple/field-components/file-section/file-section.component";
import {
  MetadataRepresentationListComponent
} from "../../../../../../custom/app/item-page/simple/metadata-representation-list/metadata-representation-list.component";
import {
  ItemPageSdgFieldComponent
} from "../../../../../../../app/item-page/simple/field-components/specific-field/sdg/item-page-sdg-field.component";
import {
  GenericItemPageFieldComponent
} from "../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component";
import {TruncatableComponent} from "../../../../../../../app/shared/truncatable/truncatable.component";
import {
  TruncatablePartComponent
} from "../../../../../../../app/shared/truncatable/truncatable-part/truncatable-part.component";
import {
  ItemPageUriFieldComponent
} from "../../../../../../../app/item-page/simple/field-components/specific-field/uri/item-page-uri-field.component";
import {
  CollectionsComponent
} from "../../../../../../../app/item-page/field-components/collections/collections.component";
import {
  ItemPageOtherUriFieldComponent
} from "../../../../../../../app/item-page/simple/field-components/specific-field/other-uri/item-page-other-uri-field.component";
import {
  ItemPageAgrovocFieldComponent
} from "../../../../../../../app/item-page/simple/field-components/specific-field/agrovoc/item-page-agrovoc-field.component";
import {
  ItemPageMetadataSearchLinkFieldComponent
} from "../../../../../../../app/item-page/simple/field-components/specific-field/metadata-search-link/item-page-metadata-search-link-field.component";
import {
  ItemPageOrcidFieldComponent
} from "../../../../../../../app/item-page/simple/field-components/specific-field/orcid/item-page-orcid-field.component";
import {
  ItemPagePartnersLogosFieldComponent
} from "../../../../../../../app/item-page/simple/field-components/specific-field/partners-logos/item-page-partners-logos-field.component";
import {
  ItemPageMapComponent
} from "../../../../../../../app/item-page/simple/field-components/specific-field/map/item-page-map.component";
import {
  ThemedResultsBackButtonComponent
} from "../../../../../../../app/shared/results-back-button/themed-results-back-button.component";

/**
 * Component that represents an untyped Item page
 */
@listableObjectComponent(Item, ViewMode.StandalonePage, Context.Any, 'cgiar')
@Component({
  selector: 'ds-untyped-item',
  styleUrls: ['./untyped-item.component.scss'],
  templateUrl: './untyped-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    MiradorViewerComponent,
    ItemPageTitleFieldComponent,
    DsoEditMenuComponent,
    ItemPageSocialShareComponent,
    ItemPageAltmetricFieldComponent,
    ItemPageDimensionsFieldComponent,
    ItemPageStatisticsFieldComponent,
    NgbModule,
    MetadataFieldWrapperComponent,
    ThumbnailComponent,
    MediaViewerComponent,
    TranslateModule,
    FileSectionComponent,
    MetadataRepresentationListComponent,
    ItemPageSdgFieldComponent,
    RouterLink,
    GenericItemPageFieldComponent,
    TruncatableComponent,
    TruncatablePartComponent,
    ItemPageUriFieldComponent,
    CollectionsComponent,
    ItemPageOtherUriFieldComponent,
    ItemPageAgrovocFieldComponent,
    ItemPageMetadataSearchLinkFieldComponent,
    ItemPageOrcidFieldComponent,
    ItemPagePartnersLogosFieldComponent,
    ItemPageMapComponent,
    ThemedResultsBackButtonComponent,
  ]
})
export class UntypedItemComponent extends BaseComponent implements OnInit {
  @Input() object: Item;

  constructor(
    protected routeService: RouteService,
    protected router: Router,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private httpClient: HttpClient,
  ) {
    super(routeService, router);
  }

  socialIcons = {
    twitter: {
      iconClass: 'fa-brands fa-twitter x-large',
      tooltip: 'Twitter',
      urlField: 'dc.identifier.uri',
      textField: 'dc.title',
    },
    whatsapp: {
      iconClass: 'fa-brands fa-whatsapp x-large',
      tooltip: 'WhatsApp',
      urlField: 'dc.identifier.uri',
      textField: 'dc.title',
    },
    linkedin: {
      iconClass: 'fa-brands fa-linkedin-in x-large',
      tooltip: 'LinkedIn',
      urlField: 'dc.identifier.uri',
      textField: 'dc.title',
    },
    facebook: {
      iconClass: 'fa-brands fa-facebook-f x-large',
      tooltip: 'Facebook',
      urlField: 'dc.identifier.uri',
      textField: 'dc.title',
    },
    email: {
      iconClass: 'fa-solid fa-at x-large',
      tooltip: 'Email',
      urlField: 'dc.identifier.uri',
      textField: 'dc.title',
    },
    link: {
      iconClass: 'fa-solid fa-link x-large',
      tooltip: 'Copy link',
      urlField: 'dc.identifier.uri',
      textField: 'dc.title',
    },
  };

  fileDownloadBaseUrl = this.appConfig.fileDownload.fileDownloadBaseUrl;
  fileDownloadField = this.appConfig.fileDownload.fileDownloadField;

  ngOnInit() {
    this.httpClient.get(`${this.appConfig.fileDownload.fileDownloadTrackNameSpace}${this.object.uuid}`)
      .subscribe();
    super.ngOnInit();
  }

  mailTo(email: string, domain: string) {
    window.location.href = `mailto:${email}@${domain}`;
  }
}
