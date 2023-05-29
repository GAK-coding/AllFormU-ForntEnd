import { BallonChat } from '../../../typings/chatbot';
import { BallonWrapper, ChatBallon, ChatbotWrapper, GAK, UserBallon, UserWrapper } from './styles';
import { useRecoilState } from 'recoil';
import { userLoading } from '../../../recoil/Chatbot/atom';
import { useEffect } from 'react';

export default function Ballon({ chatbot, user }: BallonChat) {
  return (
    <>
      <ChatbotWrapper>
        <BallonWrapper>
          <GAK>
            <img src="/images/gak_chatbot.png" alt="gak" />
            <span>GAK</span>
          </GAK>
          <ChatBallon>{chatbot}</ChatBallon>
        </BallonWrapper>
      </ChatbotWrapper>
      {user !== '' && (
        <UserWrapper>
          <UserBallon>{user}</UserBallon>
        </UserWrapper>
      )}
    </>
  );
}
