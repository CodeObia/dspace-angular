import { AfterViewInit, Component, Inject, Input, PLATFORM_ID } from '@angular/core';

import { ItemPageFieldComponent } from '../item-page-field.component';
import { Item } from '../../../../../core/shared/item.model';
import { BrowseDefinitionDataService } from '../../../../../core/browse/browse-definition-data.service';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../../../../../../config/app-config.interface';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'ds-item-page-map',
  styleUrls: ['./item-page-map.component.scss'],
  templateUrl: './item-page-map.component.html'
})
/**
 * This component renders countries on the map.
 * It expects 5 parameters: The item, show/hide percentage, an i18n key for views, an i18n key for downloads and parent wrapper classes
 */
export class ItemPageMapComponent extends ItemPageFieldComponent implements AfterViewInit {

  public L = null;

  constructor(
      private httpClient: HttpClient,
      protected browseDefinitionDataService: BrowseDefinitionDataService,
      @Inject(APP_CONFIG) private appConfig: AppConfig,
      @Inject(PLATFORM_ID) private platform: Object,
  ) {
    super(browseDefinitionDataService);
    if (isPlatformBrowser(platform)) {
      this.L = require('leaflet');
    }
  }

  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  /**
   * Fields (schema.element.qualifier) used to render their values.
   */
  @Input() fields: string[];

  countriesData: any;

  private map: any;

  private initMap(): void {
    const iconRetinaUrl = 'assets/cgiar/images/map/marker-icon-2x.png';
    const iconUrl = 'assets/cgiar/images/map/marker-icon.png';
    const shadowUrl = 'assets/cgiar/images/map/marker-shadow.png';
    this.L.Marker.prototype.options.icon = this.L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    this.map = this.L.map('item-page-map', {
      center: [0, 0],
      zoom: 2,
      scrollWheelZoom: false
    });

    this.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    }).addTo(this.map);

    this.countriesData.map((country: any) => {
      const marker = this.L.marker([country.lat, country.lng]);
      marker.bindPopup(country.name);
      marker.addTo(this.map);

      marker
          .on('click', (e) => {
            e.target.openPopup();
            this.map.setView([e.latlng.lat, e.latlng.lng], 4);
          })
          .on('mouseover', (e) => {
            e.target.openPopup();
          })
          .on('mouseout', (e) => {
            e.target.closePopup();
          });
    });
  }

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platform)) {
      const countriesIso = this.item?.allMetadata(this.fields).map(mdValue => mdValue.value);
      if (countriesIso.length > 0) {
        this.httpClient
            .get(`${this.appConfig.stats.CountriesDetailsNameSpace}${countriesIso}`)
            .subscribe({
              next: (data: any) => {
                this.countriesData = data.data;
                if (this.countriesData.length > 0) {
                  this.initMap();
                }
              },
              error: (error) => {
                console.log('error => ', error)
              },
            });
      }
    }
  }
}
