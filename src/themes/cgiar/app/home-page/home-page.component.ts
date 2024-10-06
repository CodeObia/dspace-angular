import { Component } from '@angular/core';
import { HomePageComponent as BaseComponent } from '../../../../app/home-page/home-page.component';
import { CardSettings } from '../../../../app/shared/cards/card-settings.type';

@Component({
  selector: 'ds-home-page',
  styleUrls: ['./home-page.component.scss'],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent extends BaseComponent {
  topPageCardsSettings: CardSettings[] = [
    {
      title: 'stats.card.totalItems',
      icon: 'fa-solid fa-network-wired',
      image: null,
      show_percentage: false,
      field: 'count',
      facet_type: null,
      sum_buckets: [],
      limit: null,
      routerLink: '/search',
      queryParams: {},
      chart: null,
      repeat_all_buckets: false,
      image_base_url: null,
    },
    {
      title: 'stats.card.openlyAccessible',
      icon: 'fa-solid fa-check',
      image: null,
      show_percentage: true,
      field: 'accessStatus_keyword',
      facet_type: 'aggregated',
      sum_buckets: ['Open access'],
      limit: null,
      routerLink: '/search',
      queryParams: this.generateSearchParams(['Open access'], 'accessStatus'),
      chart: null,
      repeat_all_buckets: false,
      image_base_url: null,
    },
    {
      title: 'stats.card.journals',
      icon: 'fa-solid fa-newspaper',
      image: null,
      show_percentage: false,
      field: 'itemtype_keyword',
      facet_type: 'aggregated',
      sum_buckets: ['Journal Article'],
      limit: null,
      routerLink: '/search',
      queryParams: this.generateSearchParams(['Journal Article'], 'itemtype'),
      chart: null,
      repeat_all_buckets: false,
      image_base_url: null,
    },
    {
      title: 'stats.card.isiJournals',
      icon: 'fa-solid fa-pen-clip',
      image: null,
      show_percentage: false,
      field: 'isiJournal_keyword',
      facet_type: 'aggregated',
      sum_buckets: ['ISI indexed'],
      limit: null,
      routerLink: '/search',
      queryParams: this.generateSearchParams(['ISI indexed'], 'isiJournal'),
      chart: null,
      repeat_all_buckets: false,
      image_base_url: null,
    },
  ];
  impactAreasCardsSettings: CardSettings[] = [
    {
      title: null,
      icon: null,
      image: null,
      show_percentage: false,
      field: 'impact_area_keyword',
      facet_type: 'aggregated',
      sum_buckets: [],
      limit: 100,
      routerLink: '/search',
      queryParams: null,
      chart: null,
      repeat_all_buckets: true,
      image_base_url: 'assets/cgiar/images/CGIAR-impact_areas/',
    },
  ];
  chartsCardsSettings: CardSettings[] = [
    {
      title: 'stats.card.countries',
      icon: null,
      image: 'assets/cgiar/images/earth-globe-colored.svg',
      show_percentage: false,
      field: 'country_keyword',
      facet_type: 'total_unique',
      sum_buckets: [],
      limit: null,
      routerLink: '/search',
      queryParams: null,
      chart: {
        chart_type: 'map',
        field: 'country_keyword',
        facet_type: 'aggregated',
        limit: 100,
      },
      repeat_all_buckets: false,
      image_base_url: null,
    },
    {
      title: 'stats.card.agrovocKeywords',
      icon: null,
      image: 'assets/cgiar/images/AGROVOC-logo.gif',
      show_percentage: false,
      field: 'agrovocKeywords_keyword',
      facet_type: 'total_unique',
      sum_buckets: [],
      limit: null,
      routerLink: '/search',
      queryParams: null,
      chart: {
        chart_type: 'wordcloud',
        field: 'agrovocKeywords_keyword',
        facet_type: 'aggregated',
        limit: 100,
        default_expanded: true,
      },
      repeat_all_buckets: false,
      image_base_url: null,
    },
    {
      title: 'search.filters.filter.sdg.head',
      icon: null,
      image: 'assets/cgiar/images/E_SDG_logo_without_UN_emblem_Square_Transparent_WEB.png',
      show_percentage: false,
      field: 'sdg_keyword',
      facet_type: 'total_unique',
      sum_buckets: [],
      limit: null,
      routerLink: '/search',
      queryParams: null,
      chart: {
        chart_type: 'pie',
        field: 'sdg_keyword',
        facet_type: 'aggregated',
        limit: 100,
        colors: {
          1: '#e5233c',
          2: '#dda73b',
          3: '#4da247',
          4: '#c7212f',
          5: '#ef412d',
          6: '#29bfe6',
          7: '#fbc414',
          8: '#a31d44',
          9: '#f26b2f',
          10: '#e01583',
          11: '#f89d2a',
          12: '#bf8d2c',
          13: '#407f46',
          14: '#1f97d4',
          15: '#5aba47',
          16: '#136b9f',
          17: '#134a6b',
        },
      },
      repeat_all_buckets: false,
      image_base_url: null,
    },
    {
      title: 'stats.card.languages',
      icon: null,
      image: 'assets/cgiar/images/language-icon-BW.png',
      show_percentage: false,
      field: 'language_keyword',
      facet_type: 'total_unique',
      sum_buckets: [],
      limit: null,
      routerLink: '/search',
      queryParams: null,
      chart: {
        chart_type: 'treemap',
        field: 'language_keyword',
        facet_type: 'aggregated',
        limit: 100,
      },
      repeat_all_buckets: false,
      image_base_url: null,
    },
  ];

  /**
   * Helper function to generate search params for the metadata value using its
   * Discovery index.
   * @type {string}
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
}

