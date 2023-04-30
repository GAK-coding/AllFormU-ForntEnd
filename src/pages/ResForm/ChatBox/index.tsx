import { Chatbot } from '../../../typings/resForm';
import { BallonWrapper, BotBallon, BotImage, UserBallon } from './styles';
export default function ChatBox({ user, chatbot }: Chatbot) {
  return (
    <BallonWrapper>
      <BotBallon>
        <BotImage src="/images/gak_chatbot.png" alt="chatbot" />
        <span>{chatbot}</span>
      </BotBallon>
      <span>gak</span>
      <UserBallon>
        <span>{user}</span>
      </UserBallon>
    </BallonWrapper>
  );
}
