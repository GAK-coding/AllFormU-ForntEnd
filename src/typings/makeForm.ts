export const DESCRIPTION_SHORT = 'Description_SHORT';
export const DESCRIPTION_LONG = 'Description_LONG';
export const DESCRIPTION_DATE = 'Description_DATE';
export const DESCRIPTION_TIME = 'Description_TIME';
export const DESCRIPTION_IMG = 'Description_IMG';
export const SELECTION_OPTION = 'Selection_OPTION';
export const SELECTION_CHECKBOX = 'Selection_CHECKBOX';
export const SELECTION_DROPDOWN = 'Selection_DROPDOWN';
export const SELECTION_LINEAR = 'Selection_LINEAR';
export const GRID_RADIO = 'Grid_RADIO';
export const GRID_CHECKBOX = 'Grid_CHECKBOX';

export interface FormInfo {
  title: string;
  description: string;
}

export type DescriptionKinds =
  | 'Description_SHORT'
  | 'Description_LONG'
  | 'Description_DATE'
  | 'Description_TIME'
  | 'Description_IMG';
export type SelectionKinds = 'Selection_OPTION' | 'Selection_CHECKBOX' | 'Selection_DROPDOWN' | 'Selection_LINEAR';
export type GridKinds = 'Grid_RADIO' | 'Grid_CHECKBOX';

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
