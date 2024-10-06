import { Config } from './config.interface';

/**
 * Config for stats and statistics.
 */
export class FileDownloadConfig implements Config {
  public fileDownloadBaseUrl?: string;
  public fileDownloadField?: string;
  public fileDownloadTrackNameSpace?: string;
}
