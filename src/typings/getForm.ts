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
