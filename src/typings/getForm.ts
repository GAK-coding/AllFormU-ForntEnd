import { DescriptionQue, FormInfo, SelectionQue } from './makeForm';

interface Question {
  createdDate: string;
  modifiedDate: string;
  id: number;
  options: Option[];
  descriptions: Description[];
  title: string | null;
  content: string | null;
  required: boolean;
  sectionNum: number;
  type: string;
}

interface Option {
  createdDate: string;
  modifiedDate: string;
  id: number;
  content: string;
  answer: boolean;
}

interface Description extends Option {
  title: string | null;
  quiz: boolean;
}

export interface GetForm {
  createdDate: string;
  modifiedDate: string;
  id: number;
  questions: Question[];
  status: string | null;
  title: string | null;
  content: string | null;
  required: boolean;
  fix: boolean;
}

// getFormInfo
export interface GetFormInfo extends FormInfo {
  id: number;
  questions: (DescriptionQue | SelectionQue)[];
  fix: boolean;
  timeout?: string[];
}

interface GetDescription extends Omit<DescriptionQue, 'tempId'> {
  id: number;
  // descriptions: Description[];
}

interface GetSelection extends Omit<SelectionQue, 'tempId'> {
  id: number;
  // options: Option[];
}

export interface makePagingData {
  id: number;
  content: string;
  title: string;
  timeout: string[];
  responsor: number;
}
