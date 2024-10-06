import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import CountryISO from '@mohammad231/iso_3166-1';
import { Country } from '@mohammad231/iso_3166-1/iso_3166-1';

import * as Highcharts from 'highcharts';
import wordCloudModule from 'highcharts/modules/wordcloud';
import ExportingModule from 'highcharts/modules/exporting';
import HighchartsMore from 'highcharts/highcharts-more';
import BoostModule from 'highcharts/modules/boost';
import MapModule from 'highcharts/modules/map';
import treemapModule from 'highcharts/modules/treemap';

const mapWorld = require('./world-palestine-morocco-highres.json');

@Component({
  selector: 'ds-stats-charts',
  styleUrls: ['./stats-charts.component.scss'],
  templateUrl: './stats-charts.component.html'
})
/**
 * This component renders stats disaggregation charts
 * It expects 3 parameters: update flag for Highcharts to update the chart, chart loading status and chart data
 */
export class StatsChartsComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private router: Router,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  @Input() updateFlag: boolean;
  @Input() chartLoading: BehaviorSubject<boolean>;
  @Input() data: BehaviorSubject<any>;

  title: string;
  chartType: string;
  isMap = false;
  highcharts: typeof Highcharts = Highcharts;
  isHighcharts = typeof Highcharts === 'object';
  chartRef: Highcharts.Chart;
  @ViewChild('chart') componentRef;

  chartOptions: Highcharts.Options
  commonChartOptions = {
    boost: {
      enabled: true,
      useGPUTranslations: true,
    },
    credits: {
      enabled: false,
    },
  };
  series: any;
  categories: any;

  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
  };

  ngOnInit() {
    if (this.isHighcharts) {
      wordCloudModule(Highcharts);
      ExportingModule(Highcharts);
      MapModule(Highcharts);
      treemapModule(Highcharts);
      BoostModule(Highcharts);
      HighchartsMore(Highcharts);
    }
    const router = this.router;
    this.data.subscribe((value) => {
      if (this.componentRef?.chart) {
        this.chartRef.destroy();
        this.componentRef.chart = null;
        delete this.chartOptions.series;
      }

      if (!value) {
        return;
      }

      this.chartType = value.chartType;
      this.title = value.title;

      if (this.chartType === 'map') {
        this.chartOptions = {
          chart: {
            map: mapWorld,
          },
          mapNavigation: {
            enabled: true,
            enableMouseWheelZoom: true,
            buttonOptions: {
              alignTo: 'spacingBox',
              verticalAlign: 'bottom',
            },
          },
          colorAxis: {
            min: 1,
            type: 'logarithmic',
            minColor: '#d7ebff',
            maxColor: '#508fcd',
          },
          plotOptions: {
            series: {
              point: {
                events: {
                  click: function () {
                    router.navigate([(this.options as any).routerLink], {
                      queryParams: (this.options as any).queryParams
                    });
                  },
                },
              },
            },
          } as any,
          series: [{
            data: value.data.map((b) => ({
              'hc-key': this.mapCountryToIsoAlpha2(b.val),
              value: b.count,
              color: b?.color,
              label: b?.label,
              routerLink: b?.routerLink,
              queryParams: b?.queryParams
            })),
            mapData: mapWorld,
            showInLegend: false,
            cursor: 'pointer',
            enableMouseTracking: true,
            allowPointSelect: true,
            tooltip: {
              pointFormat:
                '{point.name}: <b>{point.value}</b> Information Products',
              headerFormat: undefined,
            },
            dataLabels: {
              enabled: true,
              formatter: function () {
                const label = [];
                if (Number(this.point.value) > 0) {
                  label.push(this.point.name);
                  label.push(this.point.value);
                }
                return label.join(': ');
              },
            },
            animation: {
              duration: 0,
            },
            states: {
              hover: {
                color: '#427730',
              },
              select: {
                color: '#427730',
                borderColor: '#000000',
              },
            },
          }],
          ...this.commonChartOptions,
        } as Highcharts.Options;
      } else if (this.chartType === 'wordcloud') {
        this.chartOptions = {
          chart: {
            type: 'wordcloud',
            animation: true,
          },
          boost: {
            enabled: true,
            useGPUTranslations: true,
          },
          plotOptions: {
            series: {
              point: {
                events: {
                  click: function () {
                    router.navigate([(this.options as any).routerLink], {
                      queryParams: (this.options as any).queryParams
                    });
                  },
                },
              },
            },
            wordcloud: {
              tooltip: {
                pointFormat: ' <b>{point.weight}</b>',
                headerFormat: '{point.key}:',
              } as Highcharts.TooltipOptions,
              rotation: 90,
              cursor: 'pointer',
              allowPointSelect: false,
            } as Highcharts.PlotWordcloudOptions,
          },
          series: [
            {
              type: 'wordcloud',
              data: value.data.map((b) => ({
                name: b.val,
                weight: b.count,
                color: b?.color,
                label: b?.label,
                routerLink: b?.routerLink,
                queryParams: b?.queryParams
              })),
              animation: {
                duration: 200,
              },
            },
          ],
          ...this.commonChartOptions,
        } as Highcharts.Options;
      } else if (this.chartType === 'pie') {
        this.chartOptions = {
          chart: {
            type: 'pie',
            animation: true,
          },
          boost: {
            enabled: true,
            useGPUTranslations: true,
          },
          plotOptions: {
            pie: {
              cursor: 'pointer',
              showInLegend: true,
              tooltip: {
                pointFormat: '<b>{point.y}</b>',
                headerFormat: '{point.key}: ',
              },
              dataLabels: {
                enabled: true,
                formatter: function () {
                  let label = this?.key + '<br><span style="color: ' + this.color + '">' + (this as any).y + '</span>';
                  label += '<span style="color: ' + this.color + '"> (' + (this as any).percentage.toFixed(2) + '%)</span>';
                  return label;
                },
                padding: 0,
                connectorPadding: 0,
                distance: 15,
                style: {
                  textOverflow: 'clip',
                }
              },
            },
            series: {
              point: {
                events: {
                  click: function () {
                    router.navigate([(this.options as any).routerLink], {
                      queryParams: (this.options as any).queryParams
                    });
                  },
                },
              },
            },
          },
          series: [
            {
              innerSize: '75%',
              animation: true,
              type: 'pie',
              data: value.data.map((b) => ({
                name: b.val,
                y: b.count,
                color: b?.color,
                label: b?.label,
                routerLink: b?.routerLink,
                queryParams: b?.queryParams
              })),
            },
          ],
          ...this.commonChartOptions,
        } as Highcharts.Options;
      } else if (this.chartType === 'treemap') {
        this.chartOptions = {
          series: [{
            name: this.translate.instant(this.title),
            type: 'treemap',
            animationLimit: 1000,
            showInLegend: true,
            legendType: 'point',
            cursor: 'pointer',
            layoutAlgorithm: 'squarified',
            dataLabels: {
              enabled: true,
              formatter: function () {
                return this.point.label;
              }
            },
            levels: [{
              level: 1,
              dataLabels: {
                enabled: true
              },
            }],
            colorByPoint: true,
            data: value.data.map((b) => ({
              name: b.val,
              value: b.count,
              color: b?.color,
              label: b?.label,
              routerLink: b?.routerLink,
              queryParams: b?.queryParams
            }))
          } as any],
          tooltip: {
            formatter: function () {
              const point = this.point as any
              return `${point.label}: <b>${point.value}</b>`;
            },
            useHTML: true,
          },
          plotOptions: {
            series: {
              point: {
                events: {
                  click: function () {
                    router.navigate([(this.options as any).routerLink], {
                      queryParams: (this.options as any).queryParams
                    });
                  },
                },
              },
            },
          },
          ...this.commonChartOptions,
        } as Highcharts.Options;
      }

      this.initialize();
    });
  }

  initialize() {
    this.isMap = this.chartType === 'map';

    this.chartOptions.title = {
      text: this.translate.instant(this.title)
    };
    this.chartOptions.legend = {
      itemStyle: {
        color: '#000000',
      },
      enabled: true,
      layout: 'horizontal',
      floating: this.isMap,
      align: this.chartType === 'pie' ? 'right' : 'center',
      verticalAlign:
        this.chartType === 'map' ||
        this.chartType === 'packed-bubble' ||
        this.chartType === 'packed-bubble-split' ||
        this.chartType === 'column' ||
        this.chartType === 'treemap'
          ? 'bottom'
          : 'middle',
      navigation: {
        activeColor: '#3E576F',
        animation: true,
        arrowSize: 12,
        inactiveColor: '#CCCCCC',
        style: {
          fontWeight: 'bold',
          color: '#333333',
          fontSize: '12px',
        },
      } as Highcharts.LegendNavigationOptions,
    };

    if (this.chartType === 'column' || this.chartType === 'bar') {
      this.chartOptions.xAxis = {categories: this.categories, crosshair: true} as Highcharts.XAxisOptions;
    } else if (this.chartType === 'pie') {
      this.chartOptions.legend.enabled = false;
    } else if (this.chartType === 'treemap') {
      this.chartOptions.legend.labelFormatter = function () {
        return `${(this as any).label} (${(this as any).value})`;
      };
    }
    this.updateFlag = true;
    this.changeDetectorRef.detectChanges();
    this.chartLoading.next(false);
  }

  mapCountryToIsoAlpha2(value: string) {
    const country = CountryISO.get({
      name: value,
      common_name: value,
      official_name: value,
    }) as Country;
    return country ? country.alpha_2.toLowerCase() : 'NA';
  }
}
