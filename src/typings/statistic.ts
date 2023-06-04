export interface QueInfo {
  id: number;
  index: number;
  title: string;
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
