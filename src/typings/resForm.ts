export interface resInfoList {
  id: number;
  title: string;
  description?: string;
}

export interface Chat {
  myReq: string;
  gptRes: string | null;
}

export interface Chatbot {
  user: string;
  chatbot: string | null;
}

export interface ResDescription {
  question_id: number;
  content: string | null;
}

export interface ResSelection {
  questionId: number;
  num: number;
}

export interface ResSelections {
  // [key: number]: ResSelection;
  [key: number]: ResSelection | ResSelection[];
}
