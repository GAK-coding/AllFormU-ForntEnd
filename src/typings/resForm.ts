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
  member_id: number;
  question_id: number;
  content: string;
}

export interface ResSelection {
  responsorId: number;
  questionId: number;
  num: number | null;
}

export interface ResSelections {
  [key: number]: ResSelection | ResSelection[];
}

// TODO: 이거는 백엔드 수정되면 변수명 수정해야됨
export interface ResInfos {
  res: (ResDescription | ResSelection)[];
}
