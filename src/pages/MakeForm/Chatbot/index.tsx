import React from 'react';
import BaseBgBox from '../../../components/ui/BaseBgBox';
import { InPutWrapper, ViewWrapper, Wrapper } from './styles';
import {
  BallonWrapper,
  ChatBallon,
  ChatbotWrapper,
  GAK,
  UserBallon,
  UserWrapper,
} from '../../../components/BallonChat/styles';
import Ballon from '../../../components/BallonChat';

export default function MakeFormChatbot() {
  const chat = [
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

          {chat.map((message, idx) => {
            return <Ballon key={idx} user={message.user} chatbot={message.chatbot} />;
          })}
        </ViewWrapper>
        <InPutWrapper>입력란</InPutWrapper>
      </Wrapper>
    </BaseBgBox>
  );
}
