import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DatasetsPageService } from './datasets-page.service';
import { APP_CONFIG, AppConfig } from '../../config/app-config.interface';

@Component({
  selector: 'ds-datasets-page',
  templateUrl: './datasets-page.component.html',
  styleUrls: ['./datasets-page.component.scss']
})
export class DatasetsPageComponent implements OnInit {
  constructor(
    private readonly datasetsPageService: DatasetsPageService,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  datasets = [];
  datasetsHomeNameSpace = '';

  async ngOnInit() {
    this.datasetsHomeNameSpace = this.appConfig.datasets.datasetsBaseUrl + this.appConfig.datasets.datasetsHomeNameSpace;
    const result: any = await this.datasetsPageService.getDatasets();
    if(result?.data?.items) {
      result.data.items.map((item: any) => {
        const dataset = {
          id: item.entity_id,
          thumbnail: this.appConfig.datasets.datasetApiNameSpace + this.appConfig.datasets.datasetLogo.replace('[DATASET_ID]', item.entity_id),
          title: item.name,
          description: item.description,
          url: item.url,
          authors: item.authors,
          date: null,
        };

        let distributionDate = null;
        let productionDate = null;
        if (item?.metadataBlocks?.citation?.fields) {
          item.metadataBlocks.citation.fields.map((field: any) => {
            if (field.typeName === 'distributionDate') {
              distributionDate = field.value;
            }
            if (field.typeName === 'productionDate') {
              productionDate = field.value;
            }
          });
        }

        dataset.date = distributionDate ? distributionDate : productionDate;
        dataset.date = dataset.date ? dataset.date.split('-')[0] : '';
        this.datasets.push(dataset);
      });

      this.changeDetectorRef.detectChanges();
    }
  }
}

