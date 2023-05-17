import { useEffect, useState, useCallback } from 'react';
import Stomp from 'stompjs';

interface UseSocketMessageProps {
  stompClient: Stomp.Client | null;
  username: string;
}

interface ChatMessage {
  sender: string;
  content: string;
  type: string;
}

const useSocketMessage = ({ stompClient, username }: UseSocketMessageProps) => {
  const [res, setRes] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const sendMessage = useCallback(
    (req: string): void => {
      if (stompClient) {
        const chatMessage: ChatMessage = {
          sender: username,
          content: req,
          type: 'CHAT',
        };

        stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
      }
    },
    [stompClient, username]
  );

  useEffect(() => {
    const onMessageReceived = (payload: Stomp.Message): void => {
      const { content } = JSON.parse(payload.body);
      setRes(content);
      setLoading(false);
    };

    if (stompClient) {
      stompClient.subscribe('/topic/public', onMessageReceived);
    }

    return () => {
      if (stompClient) {
        stompClient.unsubscribe('/topic/public');
      }
    };
  }, [stompClient]);

  return { res, loading, sendMessage };
};

export default useSocketMessage;
