import { ChatbotChat } from '../../../typings/resForm';
import { ChatBox } from './styles';
export default function Chat({ myRes, chatbotRes }: ChatbotChat) {
  return (
    <div>
      <ChatBox type={'user'}>
        <span>{myRes}</span>
      </ChatBox>
      <ChatBox type={'chatbot'}>
        <div>
          <img src={'gak_chatbot.png'} alt={'gak_chatbot 사진'} />
          <span>{chatbotRes}</span>
        </div>
      </ChatBox>
    </div>
  );
}
