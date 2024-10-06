export type CardSettings = {
  title: string;
  icon?: string;
  image?: string;
  show_percentage?: boolean;
  field: string;
  facet_type?: string;
  sum_buckets: string[];
  limit: number;
  routerLink: string;
  queryParams: any,
  chart?: Chart,
  repeat_all_buckets: boolean;
  image_base_url: string;
};

type Chart = {
  chart_type: string;
  field: string;
  facet_type: string;
  limit: number;
  colors?: any;
  default_expanded?: boolean;
}

