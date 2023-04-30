export interface FormInfo {
  title: string;
  description: string;
}

export interface ShortQue {
  type: 'short';
  id: string;
  require: boolean;
  title: string;
  answer: string;
}
