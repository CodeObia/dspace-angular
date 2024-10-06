import { ServerConfig } from './server-config.interface';

/**
 * Config for stats and statistics.
 */
export class StatsServerConfig extends ServerConfig {
  public statsNameSpace?: string;
  public statisticsBaseUrl?: string;
  public statisticsNameSpace?: string;
  public ItemsStatisticsViewsPath?: string;
  public ItemsStatisticsDownloadsPath?: string;
  public ItemsStatisticsAggregatePath?: string;
  public PartnersLogosNameSpace?: string;
  public CountriesDetailsNameSpace?: string;
  public collectionsPath?: string;
}
