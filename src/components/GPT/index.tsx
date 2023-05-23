import { useRecoilState, useSetRecoilState } from 'recoil';
import ResFormModal from '../Form/ResForm/ResFormModal';
import { gptLoading, gptTalks } from '../../recoil/Gpt/atom';
import { chatTalks } from '../../recoil/Resform/atom';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

interface ChatMessage {
  sender: string;
  content: string;
  type: string;
}
const [talk, setTalk] = useRecoilState(gptTalks);
const [chat, setChat] = useRecoilState(chatTalks);
const [req, setReq] = useState('');
const [isModalOpen, setIsModalOpen] = useState(false);

const showModal = useCallback(() => {
  setIsModalOpen(true);
}, []);

const handleCancel = useCallback(() => {
  setIsModalOpen(false);
}, []);

const [username, setUsername] = useState('');
const [connected, setConnected] = useState(false);
const stompClient = useRef<Stomp.Client | null>(null);
const [res, setRes] = useState('');
const setLoading = useSetRecoilState(gptLoading);

//** 2. socket에서 밑에 onMessageReceived, connect, sendMessage 함수 사용 */
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
      sender: username,
      content: req,
      type: 'CHAT',
    };

    stompClient.current.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
  }
};

//** 1. resFormPage에 들어가면 맨 처음에 백엔드와 socket 연결을 함 + 응답 받음 *?
useLayoutEffect(() => {
  connect();
}, []);

useEffect(() => {
  if (connected && stompClient.current) {
    stompClient.current.subscribe('/topic/public', onMessageReceived);
  }
}, [connected, onMessageReceived]);

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

export default function GPT() {
  return <ResFormModal open={isModalOpen} onCancel={handleCancel} sendMessage={sendMessage} />;
}
