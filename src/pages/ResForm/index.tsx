import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
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

interface ChatMessage {
  sender: string;
  content: string;
  type: string;
}

export default function ResForm() {
  const { blue } = useRecoilValue(color);
  const [talk, setTalk] = useRecoilState(gptTalks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const user = '안녕';
  const chat = '안녕하세요.';

  const [username, setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const stompClient = useRef<Stomp.Client | null>(null);
  const [res, setRes] = useState('');
  const setLoading = useSetRecoilState(gptLoading);

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

  return (
    <ChatbotResWrapper>
      <div>
        <Chatting>
          <ChatBox user={user} chatbot={chat}></ChatBox>
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
                <Button color={'black'} bgColor={blue} fontSize={1} width={9.5} height={3}>
                  질문 읽어주기
                </Button>
                <Button onClick={showModal} color={'black'} bgColor={blue} fontSize={1} width={9.5} height={3}>
                  GPT한테
                  <br />
                  물어보기
                </Button>
              </BtnBox>
              <BtnBox>
                <Button color={'black'} bgColor={blue} fontSize={1} width={9.5} height={3}>
                  기타문의
                </Button>
              </BtnBox>
            </BtnBoxWrapper>
          </ChatbotFunc>

          <UserRes>
            {/* <List> */}
            {/*   <img src="button.png" alt="button" /> */}
            {/* </List> */}
            <span>질문 선택</span>
          </UserRes>
        </ChattingBottom>

        {connected && isModalOpen && (
          <ResFormModal open={isModalOpen} onCancel={handleCancel} sendMessage={sendMessage} />
        )}
      </div>
    </ChatbotResWrapper>
  );
}
