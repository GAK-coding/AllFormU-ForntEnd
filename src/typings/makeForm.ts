export interface FormInfo {
  title: string;
  description: string;
}

export type DescriptionKinds =
  | 'Description_short'
  | 'Description_long'
  | 'Description_date'
  | 'Description_time'
  | 'Description_image';
export type SelectionKinds = 'Selection_selection' | 'Selection_checkBox' | 'Selection_dropDown' | 'Selection_linear';
export type GridKinds = 'Grid_radio' | 'Grid_checkBox';

export interface DescriptionQue {
  type: DescriptionKinds;
  id: string;
  require: boolean;
  title: string;
  section: number;
}

export interface SelectionQue extends Omit<DescriptionQue, 'type'> {
  type: SelectionKinds;
  options: string[];
}

export interface GridQue extends Omit<DescriptionQue, 'type'> {
  type: GridKinds;
  rows: string[];
  cols: string[];
}

export interface makeInfoList {
  id: number;
  title: string;
  description?: string;
}
