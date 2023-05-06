import React, { ChangeEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import ResFormModal from '../../components/ResForm/ResFormModal';
import {
  ChatbotFunc,
  ChatbotResWrapper,
  Chatting,
  ChattingBottom,
  UserRes,
  Line,
  BtnBox,
  BtnBoxWrapper,
  List,
} from './styles';
import Button from '../../components/ui/Button';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { color } from '../../recoil/Color/atom';
import ChatBox from './ChatBox';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { gptLoading, gptTalks } from '../../recoil/Gpt/atom';
import { chatTalks } from '../../recoil/Resform/atom';
import Input from '../../components/ui/Input';
import BallonChat from '../../components/ResForm/BallonChat';

interface ChatMessage {
  sender: string;
  content: string;
  type: string;
}

export default function ResForm() {
  const { blue } = useRecoilValue(color);
  const [talk, setTalk] = useRecoilState(gptTalks);
  const [chat, setChat] = useRecoilState(chatTalks);
  const [req, setReq] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeReq = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setReq(e.target.value);
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
  // useLayoutEffect(() => {
  //   connect();
  // }, []);
  //
  // useEffect(() => {
  //   if (connected && stompClient.current) {
  //     stompClient.current.subscribe('/topic/public', onMessageReceived);
  //   }
  // }, [connected, onMessageReceived]);
  //
  // useEffect(() => {
  //   if (res !== null && talk.length > 0) {
  //     const temp = [...talk];
  //     const lastChat = temp.pop()!;
  //     const editedChat = { ...lastChat, gptRes: res };
  //     temp.push(editedChat);
  //     setTalk(temp);
  //   }
  // }, [res]);

  useEffect(() => {
    const temp = [...chat];
    setChat(temp);
  }, []);

  return (
    <ChatbotResWrapper>
      <div>
        <Chatting>
          {/* {chat?.map((message, idx) => { */}
          {/*   const { user, chatbot } = message; */}

          {/*   return <ChatBox key={idx} user={user} chatbot={chatbot} />; */}
          {/* })} */}
          <BallonChat chatText={'으악1231231232131231312321'} />
          <BallonChat chatText={'으악'} />
          <BallonChat chatText={'으악'} />
          <BallonChat chatText={'으악'} />
          <BallonChat chatText={'으악'} />
          <BallonChat chatText={'으악'} />
          {/*   chatText={ */}
          {/*     '으악 \n 1231231231321312312321312312312312321312312312312312312312312으악1231231231321312312321312312312312321312312312312312312312312으악1231231231321312312321312312312312321312312312312312312312312으악1231231231321312312321312312312312321312312312312312312312312' */}
          {/*   } */}
          {/* /> */}
        </Chatting>

        <ChattingBottom>
          <ChatbotFunc>
            <Line>
              챗봇기능
              <br />
              사용하기
            </Line>
            <BtnBoxWrapper>
              <BtnBox>
                <Button color={'black'} bgColor={blue} fontSize={1} width={9.8} height={3}>
                  질문 읽어주기
                </Button>
                <Button onClick={showModal} color={'black'} bgColor={blue} fontSize={1} width={9.8} height={3}>
                  GPT 이용하기
                </Button>
              </BtnBox>
              <BtnBox>
                <Button color={'black'} bgColor={blue} fontSize={1} width={9.8} height={3}>
                  기타문의
                </Button>
              </BtnBox>
            </BtnBoxWrapper>
          </ChatbotFunc>

          <UserRes>
            <Input value={req} onChange={onChangeReq} placeholder={''} height={5} />
          </UserRes>
        </ChattingBottom>

        {/* 3. 백엔드와 socket 연동이 되어야만 GPT와 대화하는 모달을 열 수 있음 */}
        {/* {connected && isModalOpen && ( */}
        {/*   <ResFormModal open={isModalOpen} onCancel={handleCancel} sendMessage={sendMessage} /> */}
        {/* )} */}
        {isModalOpen && <ResFormModal open={isModalOpen} onCancel={handleCancel} sendMessage={sendMessage} />}
      </div>
    </ChatbotResWrapper>
  );
}
