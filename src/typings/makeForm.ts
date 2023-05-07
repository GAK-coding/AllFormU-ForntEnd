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

export interface createFormData extends FormInfo {
  questions: Array<Omit<DescriptionQue, 'id'> | Omit<SelectionQue, 'id'> | Omit<GridQue, 'id'>>;
}

export interface FormInfo {
  title: string;
  content: string;
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
  required: boolean;
  title: string;
  sectionNum: number;
  descriptions: Array<{ content: string }>;
}

export interface SelectionQue extends Omit<DescriptionQue, 'type' | 'descriptions'> {
  type: SelectionKinds;
  options: Array<{ content: string }>;
}

export interface GridQue extends Omit<DescriptionQue, 'type' | 'descriptions'> {
  type: GridKinds;
  rows: string[];
  cols: string[];
}

export interface makeInfoList {
  id: number;
  title: string;
  description?: string;
}

export interface QueType {
  value: string;
  label: string;
}

export interface sectionType extends QueType {
  disabled: boolean;
}
