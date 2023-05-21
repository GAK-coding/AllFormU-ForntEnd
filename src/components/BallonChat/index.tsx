import { BallonChat } from '../../typings/chatbot';
import { BallonWrapper, ChatBallon, ChatbotWrapper, GAK, UserBallon, UserWrapper } from './styles';

export default function BallonChat({ chatbot, user }: BallonChat) {
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
      <UserWrapper>
        <UserBallon>{user}</UserBallon>
      </UserWrapper>
    </>
  );
}
