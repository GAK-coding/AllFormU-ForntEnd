import React, { useCallback } from 'react';

import Button from '../../../components/ui/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';

import { gptOpen } from '../../../recoil/Gpt/atom';
import Input from '../../../components/ui/Input';
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
import GPTSocket from '../../../components/GPT/GPTSocket';

export default function ChatbotResForm() {
  const { blue } = useRecoilValue(color);

  const [isOpen, setIsOpen] = useRecoilState(gptOpen);

  const showModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const chatt = [
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

          {chatt.map((message, idx) => {
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
                응답 저장
              </Button>
              <Button onClick={showModal} color={'#2d2d2d'} bgColor={blue} fontSize={1.2} width={11} height={3.5}>
                GPT 이용하기
              </Button>
            </FunctionContent>
          </FunctionWrapper>
          {isOpen && <GPTSocket />}

          <UserResWrapper></UserResWrapper>
          {/* <UserRes>
            <Input value={req} onChange={onChangeReq} placeholder={''} height={5} />
          </UserRes> */}
        </InPutWrapper>
      </Wrapper>
    </BaseBgBox>
  );
}
