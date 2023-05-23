import { useCallback } from 'react';
import BaseBgBox from '../../../components/ui/BaseBgBox';
import {
  FunctionContent,
  FunctionTitle,
  FunctionWrapper,
  InPutWrapper,
  UserResWrapper,
  ViewWrapper,
  Wrapper,
} from '../styles';
import { BallonWrapper, ChatBallon, ChatbotWrapper, GAK } from '../../../components/Chatbot/BallonChat/styles';
import Ballon from '../../../components/Chatbot/BallonChat';
import Button from '../../../components/ui/Button';
import { color } from '../../../recoil/Color/atom';
import GPT from '../../../components/GPT';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gptOpen } from '../../../recoil/Gpt/atom';

export default function MakeFormChatbot() {
  const { blue } = useRecoilValue(color);
  const [isOpen, setIsOpen] = useRecoilState(gptOpen);

  const showModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const chattt = [
    {
      chatbot: '챗봇 생성 시작?',
      user: '시작',
    },
    {
      chatbot: '챗봇 생성 시작?',
      user: '시작',
    },
    {
      chatbot: '챗봇 생성 시작?',
      user: '시작',
    },
  ];

  return (
    <BaseBgBox>
      <Wrapper>
        <ViewWrapper>
          <ChatbotWrapper>
            <BallonWrapper>
              <GAK>
                <img src="/images/gak_chatbot.png" alt="gak" />
                <span>GAK</span>
              </GAK>
              <ChatBallon>
                <span>안녕하세요, All Form U 챗봇 설문 생성 서비스입니다 ☺️</span>
              </ChatBallon>
            </BallonWrapper>
          </ChatbotWrapper>

          {chattt.map((message, idx) => {
            return <Ballon key={idx} user={message.user} chatbot={message.chatbot} />;
          })}
        </ViewWrapper>
        <InPutWrapper>
          <FunctionWrapper>
            <FunctionTitle>
              <span>부가 기능 사용하기</span>
            </FunctionTitle>
            <FunctionContent>
              <Button color={'#2d2d2d'} bgColor={blue} fontSize={1.2} width={11} height={3.5}>
                폼 미리보기
              </Button>
              <Button onClick={showModal} color={'#2d2d2d'} bgColor={blue} fontSize={1.2} width={11} height={3.5}>
                GPT 이용하기
              </Button>
            </FunctionContent>
          </FunctionWrapper>

          {isOpen && <GPT />}
          <UserResWrapper></UserResWrapper>
        </InPutWrapper>
      </Wrapper>
    </BaseBgBox>
  );
}
