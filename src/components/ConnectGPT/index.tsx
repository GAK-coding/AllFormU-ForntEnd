import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Stomp from 'stompjs';
import { gptLoading, gptTalks } from '../../recoil/Gpt/atom';
import SockJS from 'sockjs-client';
import { userInfo } from '../../recoil/User/atom';
import { chatTalks } from '../../recoil/Resform/atom';
import ResFormModal from '../Form/ResForm/ResFormModal';

interface Props {
  open: boolean;
}

export default function ConnectGPT(props: Props) {
  interface ChatMessage {
    sender: string;
    content: string;
    type: string;
  }

  const { nickname } = useRecoilValue(userInfo);
  const [res, setRes] = useState('');
  const [connected, setConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [talk, setTalk] = useRecoilState(gptTalks);
  const [chat, setChat] = useRecoilState(chatTalks);

  const setLoading = useSetRecoilState(gptLoading);
  const stompClient = useRef<Stomp.Client | null>(null);

  useEffect(() => {
    setIsModalOpen(props.open);
  }, []);

  useEffect(() => {
    if (res !== null && talk.length > 0) {
      const temp = [...talk];
      const lastChat = temp.pop()!;
      const editedChat = { ...lastChat, gptRes: res };
      temp.push(editedChat);
      setTalk(temp);
    }
  }, [res]);

  useEffect(() => {
    const temp = [...chat];
    setChat(temp);
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onMessageReceived = useCallback(
    (payload: Stomp.Message) => {
      const { content } = JSON.parse(payload.body);
      setRes(content);
      setLoading(false);
    },
    [res]
  );

  const connect = () => {
    const socket = new SockJS('/ws');
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect(
      {},
      () => {
        setConnected(true);
        console.log('연결 성공');
        stompClient.current?.send('/app/chat.addUser', {}, JSON.stringify({ sender: 'username', type: 'JOIN' }));
      },
      () => {
        console.error('연결 실패');
      }
    );
  };

  const sendMessage = (req: string) => {
    if (stompClient.current) {
      const chatMessage: ChatMessage = {
        sender: nickname,
        content: req,
        type: 'CHAT',
      };

      stompClient.current.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
    }
  };

  useLayoutEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (connected && stompClient.current) {
      stompClient.current.subscribe('/topic/public', onMessageReceived);
    }
  }, [connected, onMessageReceived]);

  return (
    <>
      {connected && isModalOpen && (
        <ResFormModal open={isModalOpen} onCancel={handleCancel} sendMessage={sendMessage} />
      )}
    </>
  );
}
