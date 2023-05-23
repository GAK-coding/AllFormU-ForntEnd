import React, { ChangeEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import Button from '../../../components/ui/Button';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { gptLoading, gptTalks } from '../../../recoil/Gpt/atom';
import { chatTalks } from '../../../recoil/Resform/atom';
import Input from '../../../components/ui/Input';
import ResFormModal from '../../../components/Form/ResForm/ResFormModal';
import BaseBgBox from '../../../components/ui/BaseBgBox';
import {
  FunctionContent,
  FunctionTitle,
  FunctionWrapper,
  InPutWrapper,
  UserResWrapper,
  ViewWrapper,
  Wrapper,
} from '../styles';
import { BallonWrapper, ChatBallon, ChatbotWrapper, GAK } from '../../../components/Chatbot/BallonChat/styles';
import Ballon from '../../../components/Chatbot/BallonChat';

interface ChatMessage {
  sender: string;
  content: string;
  type: string;
}

export default function ChatbotResForm() {
  const { blue } = useRecoilValue(color);
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

  const chatt = [
    {
      chatbot: '챗봇 생성 시작?',
      user: '시작',
    },
    {
      chatbot: '챗봇 생성 시작?',
      user: '시작',
    },
    {
      chatbot: '챗봇 생성 시작?',
      user: '시작',
    },
  ];
  return (
    <BaseBgBox>
      <Wrapper>
        <ViewWrapper>
          <ChatbotWrapper>
            <BallonWrapper>
              <GAK>
                <img src="/images/gak_chatbot.png" alt="gak" />
                <span>GAK</span>
              </GAK>
              <ChatBallon>
                <span>안녕하세요, All Form U 챗봇 설문 생성 서비스입니다 ☺️</span>
              </ChatBallon>
            </BallonWrapper>
          </ChatbotWrapper>

          {chatt.map((message, idx) => {
            return <Ballon key={idx} user={message.user} chatbot={message.chatbot} />;
          })}
        </ViewWrapper>
        <InPutWrapper>
          <FunctionWrapper>
            <FunctionTitle>
              <span>부가 기능 사용하기</span>
            </FunctionTitle>
            <FunctionContent>
              <Button color={'#2d2d2d'} bgColor={blue} fontSize={1.2} width={11} height={3.5}>
                응답 저장
              </Button>
              <Button onClick={showModal} color={'#2d2d2d'} bgColor={blue} fontSize={1.2} width={11} height={3.5}>
                GPT 이용하기
              </Button>
            </FunctionContent>
          </FunctionWrapper>
          {connected && isModalOpen && (
            <ResFormModal open={isModalOpen} onCancel={handleCancel} sendMessage={sendMessage} />
          )}

          <UserResWrapper></UserResWrapper>
          {/* <UserRes>
            <Input value={req} onChange={onChangeReq} placeholder={''} height={5} />
          </UserRes> */}
        </InPutWrapper>
      </Wrapper>
    </BaseBgBox>
  );
}
