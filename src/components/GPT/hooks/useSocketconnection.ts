import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
interface UseSocketConnectionProps {
  onConnect: () => void;
}

export const useSocketConnection = ({ onConnect }: UseSocketConnectionProps) => {
  const stompClient = useRef<Stomp.Client | null>(null);

  useEffect(() => {
    const connect = () => {
      const socket = new SockJS('/ws');
      stompClient.current = Stomp.over(socket);

      stompClient.current.connect(
        {},
        () => {
          console.log('연결 성공');
          onConnect();
          stompClient.current?.send('/app/chat.addUser', {}, JSON.stringify({ sender: 'username', type: 'JOIN' }));
        },
        () => {
          console.error('연결 실패');
        }
      );
    };

    connect();

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect(() => {
          console.log('연결이 끊어졌습니다.');
        });
      }
    };
  }, [onConnect]);

  return { stompClient: stompClient.current };
};
