import { Option } from './makeForm';

export interface QueInfo {
  id: number;
  index: number;
  title: string;
  type: string;
  options?: Option[];
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
  options: Option[];
}

export interface QueResInfo {
  queInfo: DescriptionResStatistic | SelectionResStatistic;
  options?: Option[];
}
