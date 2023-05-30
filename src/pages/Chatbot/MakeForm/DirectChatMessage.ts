interface Chatbot {
  message: string;
}
export const directChatMessage = (): { detailMessage: Chatbot[]; initMessage: Chatbot[] } => {
  const initMessage = [
    {
      message: '생성할 설문 제목을 입력해주세요.',
    },
    {
      message: '설문의 상세 설명을 입력해주세요.',
    },
    {
      message: '생성할 섹션의 개수를 입력해주세요. ex) 2개',
    },
  ];

  // 생성된 섹션의 개수만큼 반복

  const detailMessage = [
    {
      message: '섹션의 제목을 입력해주세요.',
    },
    {
      message: '생성할 질문의 개수를 입력해주세요. ex) 5개',
    },
  ];

  return { initMessage, detailMessage };
};
