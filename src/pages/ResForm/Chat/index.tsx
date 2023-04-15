import { ChatbotChat } from '../../../typings/resForm';
import { ChatBot, User } from './styles';
export default function Chat({ myRes, chatbotRes }: ChatbotChat) {
  return (
    <div>
      <ChatBot>
        <img src={'gak_chatbot.png'} alt={'gak_chatbot 사진'} />
        <div>
          <span>{chatbotRes}</span>
        </div>
      </ChatBot>

      <User>
        <div>
          <span>{myRes}</span>
        </div>
      </User>
    </div>
  );
}
