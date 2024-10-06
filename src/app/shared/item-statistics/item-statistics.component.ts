import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../../../config/app-config.interface';
import CountryISO from '@mohammad231/iso_3166-1';
import { Country } from '@mohammad231/iso_3166-1/iso_3166-1';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Statistics } from './statistics.type';

@Component({
  selector: 'ds-item-statistics',
  styleUrls: ['./item-statistics.component.scss'],
  templateUrl: './item-statistics.component.html'
})
/**
 * This component renders a statistics (views and downloads) chart and aggregated tables
 * It expects 6 parameters: The item ID, the object type (item, collection, ...), an i18n key for views, an i18n key for downloads, a flag to get the statistics aggregated and a flag to render the widget
 */
export class ItemStatisticsComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {}

  /**
   * Item UUID
   */
  @Input() itemId: string;

  /**
   * DSpace object type
   */
  @Input() dspaceObjectType: any;

  /**
   * Label i18n key for views
   */
  @Input() labelViews: string;

  /**
   * Label i18n key for downloads
   */
  @Input() labelDownloads: string;

  /**
   * To show/hide aggregations
   */
  @Input() renderAggregations = false;

  /**
   * To show/hide the widget
   */
  @Input() widget = true;

  /**
   * Total numbers
   */
  statisticsTotal = {
    views: {
      value: 0,
      percentage: 0,
      popover: {
        value: 0,
        countries: [],
      }
    },
    downloads: {
      value: 0,
      percentage: 0,
      popover: {
        value: 0,
        countries: [],
      }
    },
  };

  /**
   * Aggregated statistics
   */
  aggregations = {
    country: [],
    city: [],
    month: [],
  }

  loadingCount = new BehaviorSubject<number>(0);

  dspaceObjectTypeMapper = {
    item: 'items',
    collection: 'collections',
    community: 'communities',
    repository: 'repository',
  }

  async ngOnInit() {
    if (!this.dspaceObjectTypeMapper?.[this.dspaceObjectType]) {
      return;
    }

    this.loadingCount.subscribe(value => {
      if (value === 0) {
        this.changeDetectorRef.detectChanges();
      }
    });

    this.loadingCount.next(this.loadingCount.getValue() + 1);
    this.setAllTimeStatistics(await this.getStatistics());

    let startDate = new Date();
    startDate.setDate(1);
    startDate.setMonth(startDate.getMonth() - 5);
    const startDateString = `${startDate.toISOString().split('T')[0]}`;
    const last6MonthsStatistics = await this.getStatistics('country', startDateString, null);
    this.setPopoverTotal(last6MonthsStatistics);
    this.setPopoverAggregation(last6MonthsStatistics);

    if (this.renderAggregations) {
      Object.keys(this.aggregations).map(async (aggregateBy) => {
        this.loadingCount.next(this.loadingCount.getValue() + 1);
        this.setAggregatedStatistics(await this.getStatistics(aggregateBy, null, null), aggregateBy);
      });
    }
  }

  async getStatistics(aggregateBy: string = '', startDate: string = '', endDate: string = ''): Promise<Statistics> {
    const url = this.appConfig.stats.statisticsNameSpace
      .replace('[DSPACE_OBJECT_TYPE]', this.dspaceObjectTypeMapper[this.dspaceObjectType])
      .replace('[DSPACE_ITEM_ID]', this.itemId);

    const params = {
      aggregate: aggregateBy,
      start_date: startDate,
      end_date: endDate,
    };
    if (!aggregateBy) {
      delete params.aggregate;
    }
    if (!startDate) {
      delete params.start_date;
    }
    if (!endDate) {
      delete params.end_date;
    }

    return await firstValueFrom(this.httpClient.get(url, {params}))
      .then((response) => {
        return response;
      })
      .catch(e => null);
  }

  setAllTimeStatistics(data: any) {
    const statisticsViewsPath = this.appConfig.stats.ItemsStatisticsViewsPath.split('->');
    const statisticsDownloadsPath = this.appConfig.stats.ItemsStatisticsDownloadsPath.split('->');

    let views = data;
    statisticsViewsPath.map(path => views = views?.[path]);
    this.statisticsTotal.views.value = Number(views) ? Number(views) : 0;
    let downloads = data;
    statisticsDownloadsPath.map(path => downloads = downloads?.[path]);
    this.statisticsTotal.downloads.value = Number(downloads) ? Number(downloads) : 0;

    const total = this.statisticsTotal.views.value + this.statisticsTotal.downloads.value;
    if (total > 0) {
      this.statisticsTotal.views.percentage = this.statisticsTotal.views.value / total * 100;
      this.statisticsTotal.downloads.percentage = 100 - this.statisticsTotal.views.percentage;
    }
    this.loadingCount.next(this.loadingCount.getValue() - 1);
  }

  setPopoverTotal(data: any) {
    const statisticsViewsPath = this.appConfig.stats.ItemsStatisticsViewsPath.split('->');
    const statisticsDownloadsPath = this.appConfig.stats.ItemsStatisticsDownloadsPath.split('->');

    let views = data;
    statisticsViewsPath.map(path => views = views?.[path]);
    this.statisticsTotal.views.popover.value = Number(views) ? Number(views) : 0;
    let downloads = data;
    statisticsDownloadsPath.map(path => downloads = downloads?.[path]);
    this.statisticsTotal.downloads.popover.value = Number(downloads) ? Number(downloads) : 0;
  }

  setPopoverAggregation(data: any) {
    const statistics6MonthsCountriesPath = this.appConfig.stats.ItemsStatisticsAggregatePath
      .replace('[AGGREGATE]', 'country')
      .split('->');

    let countries = data;
    statistics6MonthsCountriesPath.map(path => countries = countries?.[path]);
    if (Array.isArray(countries)) {
      countries.map(country => {
        if (country.views > 0) {
          this.statisticsTotal.views.popover.countries.push({
            country: this.getCountryName(country.country_iso),
            value: country.views,
          });
        }
        if (country.downloads > 0) {
          this.statisticsTotal.downloads.popover.countries.push({
            country: this.getCountryName(country.country_iso),
            value: country.downloads,
          });
        }
      });
    }

    this.statisticsTotal.views.popover.countries.sort((a, b) => b.value - a.value).splice(5);
    this.statisticsTotal.downloads.popover.countries.sort((a, b) => b.value - a.value).splice(5);
  }

  setAggregatedStatistics(data: any, aggregateBy: string) {
    const statisticsAggregatePath = this.appConfig.stats.ItemsStatisticsAggregatePath
      .replace('[AGGREGATE]', aggregateBy)
      .split('->');

    let aggregatedData = data;
    statisticsAggregatePath.map(path => aggregatedData = aggregatedData?.[path]);
    if (Array.isArray(aggregatedData)) {
      aggregatedData.map(aggregatedItem => {
        const statisticsObject = {
          views: aggregatedItem.views,
          downloads: aggregatedItem.downloads,
          label: '',
          originalLabel: '',
        };
        if (aggregateBy === 'country') {
          statisticsObject.label = this.getCountryName(aggregatedItem.country_iso);
          statisticsObject.originalLabel = aggregatedItem.country_iso;
        } else if (aggregateBy === 'city') {
          statisticsObject.label = aggregatedItem.city_name;
          statisticsObject.originalLabel = aggregatedItem.city_name;
        } else if (aggregateBy === 'month') {
          statisticsObject.label = this.getMonthName(aggregatedItem.month);
          statisticsObject.originalLabel = aggregatedItem.month;
        }
        this.aggregations[aggregateBy].push(statisticsObject);
      });
    }
    if (aggregateBy === 'month') {
      this.aggregations[aggregateBy].sort((a, b) => (new Date(b.originalLabel)).getTime() - (new Date(a.originalLabel).getTime()));
    } else {
      this.aggregations[aggregateBy].sort((a, b) => b.views - a.views);
    }
    this.loadingCount.next(this.loadingCount.getValue() - 1);
  }

  getMonthName(monthDate: string) {
    const monthsNames = {
      1: 'Jan',
      2: 'Feb',
      3: 'Mar',
      4: 'Apr',
      5: 'May',
      6: 'Jun',
      7: 'Jul',
      8: 'Aug',
      9: 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec',
    };

    const dateArray = monthDate.split('-');

    return monthsNames[Number(dateArray[1])] + ' ' + dateArray[0];
  }

  getCountryName(iso: string) {
    const countryObject = (CountryISO.get({alpha_2: iso})) as Country;
    return countryObject?.name ? countryObject.name : iso
  }
}

