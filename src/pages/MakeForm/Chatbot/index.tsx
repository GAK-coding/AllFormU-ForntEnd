import React from 'react';
import BaseBgBox from '../../../components/ui/BaseBgBox';
import { ChatbotWrapper, InPutWrapper, ViewWrapper, Wrapper } from './styles';

export default function MakeFormChatbot() {
  return (
    <BaseBgBox>
      <Wrapper>
        <ViewWrapper>
          <ChatbotWrapper>
            <div>
              챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선
              1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선 1챗봇 말풍선
              1챗봇 말풍선 1
            </div>
            <div>챗봇 말풍선 2</div>
          </ChatbotWrapper>
        </ViewWrapper>
        <InPutWrapper>입력란</InPutWrapper>
      </Wrapper>
    </BaseBgBox>
  );
}
