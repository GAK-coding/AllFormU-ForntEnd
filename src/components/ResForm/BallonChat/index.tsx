import React from 'react';
import { BallonChatWrapper, BallonChatWrapperLeft, BallonChatWrapperRight } from './styles';

interface Props {
  chatText: string;
}

export default function BallonChat({ chatText }: Props) {
  return (
    <BallonChatWrapper>
      <BallonChatWrapperLeft>
        <span>{chatText}</span>
      </BallonChatWrapperLeft>
    </BallonChatWrapper>
  );
}
