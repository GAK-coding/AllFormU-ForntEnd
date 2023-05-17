import React, { useEffect, useState } from 'react';
import { useSocketConnection } from '../hooks/useSocketconnection';
import useSocketMessage from '../hooks/useSocketMessage';

export default function GPTModal() {
  const [talk, setTalk] = useState([]);
  const [chat, setChat] = useState([]);
  const username = 'your_username';

  const { stompClient } = useSocketConnection({
    onConnect: () => {
      console.log('연결 성공');
      stompClient?.send('/app/chat.addUser', {}, JSON.stringify({ sender: username, type: 'JOIN' }));
    },
  });

  const { res, loading, sendMessage } = useSocketMessage({ stompClient, username });
  return (
    <></>
    // JSX 코드를 여기에 작성합니다.
  );
}
