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
                <span>안녕하세요, All Form U 챗봇 설문 생성 서비스입니다 ☺️</span>
              </ChatBallon>
            </BallonWrapper>
          </ChatbotWrapper>

          {/* {chat?.map((message, idx) => {
            const { user, chatbot } = message;

            return <BallonChat key={idx} user={user} chatbot={chatbot} />;
          })} */}
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
