import React from 'react';
import BaseBgBox from '../../../components/ui/BaseBgBox';
import {
  BallonWrapper,
  ChatBallon,
  ChatbotWrapper,
  GAK,
  InPutWrapper,
  UserBallon,
  UserWrapper,
  ViewWrapper,
  Wrapper,
} from './styles';

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
                챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선
                1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선
                1챗봇 말풍선 1
              </ChatBallon>
            </BallonWrapper>
            <BallonWrapper>
              <GAK>
                <img src="/images/gak_chatbot.png" alt="gak" />
                <span>GAK</span>
              </GAK>
              <ChatBallon>말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1</ChatBallon>
            </BallonWrapper>

            <BallonWrapper>
              <GAK>
                <img src="/images/gak_chatbot.png" alt="gak" />
                <span>GAK</span>
              </GAK>
              <ChatBallon>말풍선</ChatBallon>
            </BallonWrapper>
          </ChatbotWrapper>
          <UserWrapper>
            <UserBallon>
              유저 말풍선 1유저 말풍선 1유저 말풍선 1유저 말풍선 1유저 말풍선 1유저 말풍선 1유저 말풍선 1유저 말풍선
              1유저 말풍선 1유저 말풍선 1유저 말풍선 1유저 말풍선 1유저 말풍선 1유저 말풍선 1유저 말풍선 1유저 말풍선
              1유저 말풍선 1유저 말풍선 1유저 말풍선 1유저 말풍선 1유저 말풍선 1유저 말풍선 1
            </UserBallon>
          </UserWrapper>
        </ViewWrapper>
        <InPutWrapper>입력란</InPutWrapper>
      </Wrapper>
    </BaseBgBox>
  );
}
