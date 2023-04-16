import { Chatbot } from '../../../typings/resForm';
import { BallonWrapper, BotBallon, UserBallon } from './styles';
export default function ChatBox({ user, chatbot }: Chatbot) {
  return (
    <BallonWrapper>
      <UserBallon>
        <span>{user}</span>
      </UserBallon>
      <BotBallon>
        <span>{chatbot}</span>
      </BotBallon>
    </BallonWrapper>
  );
}
