import { Component, Inject, Input, OnInit } from '@angular/core';
import langISO from 'iso-639-1';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../config/app-config.interface';
import { CardSettings } from './card-settings.type';
import { Card } from './card.type';

@Component({
  selector: 'ds-cards',
  styleUrls: ['./cards.component.scss'],
  templateUrl: './cards.component.html'
})
/**
 * This component renders summary cards
 * It expects 6 parameters: cards settings, cards header, cards per row, image/icon size, charts enabled and if it is a collections cards
 */
export class CardsComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {
  }
  @Input() cardsSettings: CardSettings[];
  @Input() cardHeader: string;
  @Input() cardsPerRow: number;
  @Input() isLargeImage: boolean;
  @Input() chartsEnabled: boolean;
  @Input() collectionsCards: boolean;

  cardsData: Card[] = [];
  isLoading = true;
  chartData = new BehaviorSubject(null);
  chartType: string;
  chartLoading = new BehaviorSubject(false);
  activeChart = null;

  async ngOnInit() {
    if (this.collectionsCards) {
      this.renderCollections();
    } else {
      this.renderStats();
    }
  }

  /**
   * Get facets from Solr
   * @param facets
   */
  getStats(facets: any) {
    const requestData = {
      facets: {},
      views: false,
      downloads: false,
    };
    facets.map((facet: any) => {
      if (facet?.facet_type) {
        requestData.facets[facet.field + '_' + facet.facet_type] = {
          type: facet.facet_type,
          field: facet.field,
          limit: facet?.limit ? facet.limit : 10,
        };
      } else {
        if (facet.field === 'views' || facet.field === 'downloads') {
          requestData[facet.field] = true;
        }
      }
    });

    return new Promise((resolve, reject) => {
      this.httpClient
        .post(this.appConfig.stats.statsNameSpace, requestData)
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
            console.log('error1 => ', error)
          },
        })
    });
  }

  /**
   * Get collections
   */
  getCollections() {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(this.appConfig.stats.collectionsPath)
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
            console.log('error2 => ', error)
          },
        })
    });
  }

  /**
   * Prepare Solr facets to be rendered
   */
  async renderStats() {
    let defaultChartCard = null;
    const stats = await this.getStats(this.cardsSettings);
    this.cardsSettings.map(card => {

      const facetName = (card.field === 'count' || card.field === 'views' || card.field === 'downloads') ? card.field : card.field + '_' + card.facet_type;
      if (stats?.[facetName]) {
        if (card.facet_type === 'aggregated') {
          if (card.repeat_all_buckets) {
            const discoveryIndex = card.field.slice(-8) === '_keyword' ? card.field.slice(0, -8) : card.field;
            stats[facetName].buckets.sort((a, b) => {
              let valueA = a.val.toUpperCase();
              let valueB = b.val.toUpperCase();

              if (discoveryIndex === 'sdg') {
                valueA = Number(this.getSdgNumber(valueA));
                valueB = Number(this.getSdgNumber(valueB));
              }

              return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
            });

            stats[facetName].buckets.map(facetBucket => {
              const clonedCard = structuredClone(card);
              clonedCard.title = facetBucket.val;
              clonedCard.image = this.generateImageUrl(card.image_base_url, facetBucket.val, discoveryIndex);
              clonedCard.routerLink = card.routerLink;
              clonedCard.queryParams = this.generateSearchParams([facetBucket.val], discoveryIndex);
              const cardData: Card = {
                value: facetBucket.count,
                total: 0,
                settings: clonedCard,
              };

              this.cardsData.push(cardData);
              if (!defaultChartCard && cardData.settings?.chart?.default_expanded) {
                defaultChartCard = cardData.settings;
              }
            });
          } else {
            const cardData: Card = {
              value: 0,
              total: 0,
              settings: card,
            };
            stats[facetName].buckets.map(facetBucket => {
              if (card.sum_buckets.indexOf(facetBucket.val) !== -1) {
                cardData.value += facetBucket.count;
              }
              cardData.total += facetBucket.count;
            });
            this.cardsData.push(cardData);
            if (!defaultChartCard && cardData.settings?.chart?.default_expanded) {
              defaultChartCard = cardData.settings;
            }
          }
        } else {
          const cardData: Card = {
            value: stats[facetName],
            total: 0,
            settings: card,
          };
          this.cardsData.push(cardData);
          if (!defaultChartCard && cardData.settings?.chart?.default_expanded) {
            defaultChartCard = cardData.settings;
          }
        }
      }
    });
    this.isLoading = false;

    if (defaultChartCard) {
      this.renderChart(defaultChartCard);
    }
  }

  /**
   * Prepare collections to be rendered
   */
  async renderCollections() {
    const data: any = await this.getCollections();
    const communities = data?._embedded?.communities ? data._embedded.communities : [data];
    communities.map((community: any) => {
      if (community?._embedded?.collections?._embedded?.collections) {
        community._embedded.collections._embedded.collections.map((collection: any) => {
          this.cardsData.push({
            value: collection.archivedItemsCount,
            total: 0,
            settings: {
              title: collection.name,
              icon: null,
              image: collection?._embedded?.logo?._links?.content?.href,
              show_percentage: false,
              field: null,
              facet_type: null,
              sum_buckets: [],
              limit: null,
              routerLink: '/collections/' + collection.uuid,
              queryParams: {},
              chart: null,
              repeat_all_buckets: false,
              image_base_url: null,
            },
          })
        });
      }
    });
    this.isLoading = false;
  }

  /**
   * Render chart
   * @param facet
   */
  async renderChart(facet: any) {
    if (this.activeChart === facet?.chart?.field) {
      this.chartData.next(null);
      this.activeChart = null;
      return;
    }

    this.activeChart = facet.chart.field;
    this.chartLoading.next(true);

    const data = await this.getStats([facet.chart]);
    if (data?.[`${facet.chart.field}_${facet.chart.facet_type}`]) {
      const discoveryIndex = facet.chart.field.slice(-8) === '_keyword' ? facet.chart.field.slice(0, -8) : facet.chart.field;
      let chartData = data?.[`${facet.chart.field}_${facet.chart.facet_type}`].buckets;

      chartData = chartData.map((b) => ({
        val: b.val,
        count: b.count,
        color: facet.chart.field === 'sdg_keyword' ? facet.chart.colors?.[Number(this.getSdgNumber(b.val))] : null,
        label: facet.chart.field === 'language_keyword' && langISO.validate(b.val) ? langISO.getName(b.val) : b.val,
        routerLink: facet.routerLink,
        queryParams: this.generateSearchParams([b.val], discoveryIndex)
      }));

      if (facet.chart.field === 'sdg_keyword') {
        chartData.sort((a, b) => {
          const valueA = Number(this.getSdgNumber(a.val));
          const valueB = Number(this.getSdgNumber(b.val));
          return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
        });
      }

      this.chartData.next({
        chartType: facet.chart.chart_type,
        title: facet.title,
        data: chartData
      });
    }
  }

  /**
   * Helper function to generate search params for the metadata value using its
   * Discovery index.
   * @param metadataValues
   * @param discoveryIndex
   */
  generateSearchParams(metadataValues: string[], discoveryIndex: string) {
    if (metadataValues.length === 0 || discoveryIndex === '') {
      return {};
    }
    const searchFilter = 'f.' + discoveryIndex;
    const searchValue = metadataValues.map(metadataValue => metadataValue + ',equals');

    // Note the special syntax for searchFilter, since we want to use the
    // string value of the searchFilter variable as the object key, not a
    // literal "searchFilter".
    return {[searchFilter]: searchValue};
  }

  /**
   * Helper function to construct image URL using its value
   * @param baseUrl
   * @param value
   * @param discoveryIndex
   */
  generateImageUrl(baseUrl: string, value: string, discoveryIndex: string) {
    if (discoveryIndex === 'impact_area') {
      return `${baseUrl}${value.replace(/\W+/gm, '_').toLowerCase()}.svg`;
    } else if (discoveryIndex === 'sdg') {
      return `${baseUrl}E-WEB-Goal-${this.getSdgNumber(value)}.webp`;
    }
    return null;
  }

  /**
   * Helper function to extract SDG number from text
   * @param value
   */
  getSdgNumber(value: string) {
    const matches = /^SDG\s(\d+) .*/gm.exec(value);
    if (Array.isArray(matches) && matches.length > 1 && matches?.[1]) {
      return matches?.[1].length === 1 ? `0${matches?.[1]}` : matches?.[1];
    }
    return null;
  }
}
