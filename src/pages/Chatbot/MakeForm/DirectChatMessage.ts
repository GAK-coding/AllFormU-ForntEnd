interface Chatbot {
  message: string;
}
export const directChatMessage = (): { detailMessage: Chatbot[]; initMessage: Chatbot[] } => {
  const initMessage = [
    {
      message: '설문 제목을 입력해주세요.',
    },
    {
      message: '설문 설명을 입력해주세요.',
    },
    {
      message: '생성할 섹션의 개수를 입력해주세요.',
    },
  ];

  // 생성된 섹션의 개수만큼 반복

  const detailMessage = [
    {
      message: '섹션의 제목을 입력해주세요.',
    },
    {
      message: '생성할 질문의 개수를 입력해주세요.',
    },
    {
      message: '기본 설정이 모두 완료 되었습니다!',
    },
  ];

  return { initMessage, detailMessage };
};
