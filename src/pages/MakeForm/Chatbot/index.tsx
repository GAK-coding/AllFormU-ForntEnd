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

export default function MakeFormChatbot() {
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
          <UserWrapper>
            <UserBallon>유저 말풍선</UserBallon>
          </UserWrapper>
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

          {/* {chat?.map((message, idx) => {
            const { user, chatbot } = message;

            return <BallonChat key={idx} user={user} chatbot={chatbot} />;
          })} */}
          <UserWrapper>
            <UserBallon>유저 말풍선유저</UserBallon>
          </UserWrapper>
          <UserWrapper>
            <UserBallon>
              유저 말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저유저
              말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저유저
              말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저유저
              말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저유저 말풍선유저
            </UserBallon>
          </UserWrapper>
        </ViewWrapper>
        <InPutWrapper>입력란</InPutWrapper>
      </Wrapper>
    </BaseBgBox>
  );
}
