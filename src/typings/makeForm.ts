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
  questions: Array<Omit<DescriptionQue, 'tempId'> | Omit<SelectionQue, 'tempId'> | Omit<GridQue, 'tempId'>>;
  fix: boolean;
  timeout: string[];
  fcolor: string;
  sectionName: string[];
}

export interface FormInfo {
  title: string;
  content: string;
  fimage?: string;
}

export type DescriptionKinds =
  | 'Description_SHORT'
  | 'Description_LONG'
  | 'Description_DATE'
  | 'Description_TIME'
  | 'Description_IMG';
export type SelectionKinds = 'Selection_OPTION' | 'Selection_CHECKBOX' | 'Selection_DROPDOWN' | 'Selection_LINEAR';
export type GridKinds = 'Grid_RADIO' | 'Grid_CHECKBOX';

export interface Description {
  content: string;
  id?: number;
  quiz?: boolean;
  answer?: null | string;
}

export interface DescriptionQue {
  type: DescriptionKinds;
  tempId: string;
  id?: number;
  required: boolean;
  title: string;
  sectionNum: number;
  descriptions: Description[];
  fix?: boolean;
}

export interface Option {
  content: string;
  id?: number;
  answer?: boolean;
}

export interface SelectionQue extends Omit<DescriptionQue, 'type' | 'descriptions'> {
  type: SelectionKinds;
  options: Option[];
}

export interface GridQue extends Omit<DescriptionQue, 'type' | 'descriptions'> {
  type: GridKinds;
  rows: string[];
  cols: string[];
}

export interface MakeInfoList {
  id: number;
  title: string;
  description?: string;
}

export interface QueType {
  value: string;
  label: string;
}

export interface SectionType extends QueType {
  disabled?: boolean;
}
