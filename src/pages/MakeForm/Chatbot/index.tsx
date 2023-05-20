import React from 'react';
import BaseBgBox from '../../../components/ui/BaseBgBox';
import { InPutWrapper, ViewWrapper, Wrapper } from './styles';

export default function MakeFormChatbot() {
  return (
    <BaseBgBox>
      <Wrapper>
        <ViewWrapper>채팅창 보이는거</ViewWrapper>
        <InPutWrapper>입력란</InPutWrapper>
      </Wrapper>
    </BaseBgBox>
  );
}
