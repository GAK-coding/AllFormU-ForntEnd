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

interface Description {
  createdDate: string;
  modifiedDate: string;
  id: number;
  title: string | null;
  content: string | null;
  answer: boolean | null;
  quiz: boolean;
}

export interface getForm {
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
