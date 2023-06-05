export interface QueInfo {
  id: number;
  index: number;
  title: string;
  type: string;
  options?: string[];
}

export interface ChartProps {
  id: number;
}

export interface ResponseItem {
  id: number;
  responsor_id: number;
}

export interface DescriptionResStatistic {
  response: ResponseItem[];
  opList: (string | null)[];
  num: number[];
}

export interface SelectionResStatistic {
  response: ResponseItem[];
  num: number[];
}

export interface QueResInfo {
  queInfo: DescriptionResStatistic | SelectionResStatistic;
}
