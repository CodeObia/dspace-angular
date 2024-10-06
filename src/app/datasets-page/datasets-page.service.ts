import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../config/app-config.interface';

@Injectable({
  providedIn: 'root'
})
export class DatasetsPageService {

  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    ) { }

  async getDatasets() {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(this.appConfig.datasets.datasetApiNameSpace + this.appConfig.datasets.latestDatasetQuery)
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (error) => {
            reject(error);
            console.log('error => ', error)
          },
        })
    });
  }
}

