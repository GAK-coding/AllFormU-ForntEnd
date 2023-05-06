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
