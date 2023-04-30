export interface FormInfo {
  title: string;
  description: string;
}

export interface ShortQue {
  type: 'short';
  require: boolean;
  title: string;
  answer: string;
}

export interface makeInfoList {
  title: string;
  description?: string;
}
