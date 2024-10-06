import { Config } from './config.interface';

/**
 * Config for Datasets.
 */
export class DatasetsConfig implements Config {
  public datasetsBaseUrl?: string;
  public datasetsHomeNameSpace?: string;
  public datasetApiNameSpace?: string;
  public latestDatasetQuery?: string;
  public datasetLogo?: string;
}

