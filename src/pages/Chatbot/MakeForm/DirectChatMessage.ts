interface Chatbot {
  message: string;
}

// 챗봇 설정에서 섹션의 총 개수를 받아옴
interface Props {
  repeat: number;
}
export const directChatMessage = (props: Props): { detailMessage: Chatbot[]; initMessage: Chatbot[] } => {
  const initMessage = [
    {
      message: '생성할 설문 제목을 입력해주세요.',
    },
    {
      message: '설문의 상세 설명을 입력해주세요.',
    },
    {
      message: '생성할 섹션의 개수를 입력해주세요.',
    },
  ];

  // 첫번째 섹션정보 설정
  const detailMessage = [
    {
      message: '1번째 섹션의 제목을 입력해주세요.',
    },
    {
      message: '1번째 섹션에서 생성할 질문의 개수를 입력해주세요.',
    },
  ];

  // 생성된 섹션의 개수만큼 반복
  for (let i = 2; i <= props.repeat; i++) {
    detailMessage.push(
      {
        message: `${i}번째 섹션의 제목을 입력해주세요.`,
      },
      {
        message: `${i}번째 섹션에서 생성할 질문의 개수를 입력해주세요.`,
      }
    );
  }

  return { initMessage, detailMessage };
};
