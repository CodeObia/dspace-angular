export type Statistics = {
  statistics?: StatisticsRecord[];
  data?: StatisticsRecord[];
};

type StatisticsRecord = {
  item_id: string;
  uuid: string;
  id: string;
  handle: string;
  title: string;
  views: number;
  downloads: number;
  country: aggregationCountry[];
  city: aggregationCity[];
  month: aggregationMonth[];
};

type aggregationCountry = {
  country_iso: string;
  views: number;
  downloads: number;
};

type aggregationCity = {
  city_name: string;
  views: number;
  downloads: number;
};

type aggregationMonth = {
  month: string;
  views: number;
  downloads: number;
};

