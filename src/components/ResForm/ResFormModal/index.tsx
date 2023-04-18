import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ResModal, ResModalInput, ResModalTalk, ResModalTitle } from './styles';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { Chat } from '../../../typings/resForm';
import ResFormChat from '../ResFormChat';
import { message } from 'antd';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

interface Props {
  open: boolean;
  onCancel: () => void;
}

const dummyData: Chat[] = [
  {
    myReq: '나는 바보에요?',
    gptRes: '네 바보입니다.',
  },
  {
    myReq: '나는 바보에요?',
    gptRes: null,
  },
];

export default function ResFormModal({ open, onCancel }: Props) {
  const { main } = useRecoilValue(color);
  const [talk, setTalk] = useState<Chat[]>([]);
  const [req, setReq] = useState('');

  const onChangeReq = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setReq(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (req.length > 300) {
        message.warning('입력된 값이 300자 초과입니다.');
        return;
      }

      const temp = [...talk];
      temp.push({ myReq: req, gptRes: '어쩌구 저쩌구 답변' });
      setTalk(temp);
      setReq('');
    },
    [req, talk]
  );

  const talkRef = useRef<HTMLDivElement>(null); // Ref 생성
  useEffect(() => {
    talkRef.current?.scrollTo(0, talkRef.current.scrollHeight); // Ref를 사용하여 스크롤 내리기
  }, [talk]); // talk 상태가 변경될 때마다 실행

  const username = '안녕';
  let stompClient: any = null;

  const onMessageReceived = (payload: any) => {
    console.log(payload.body);
  };

  const onConnected = () => {
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send('/app/chat.addUser', {}, JSON.stringify({ sender: username, type: 'JOIN' }));
  };

  const connect = () => {
    if (username) {
      const socket = new SockJS('/ws');
      stompClient = Stomp.over(socket);

      stompClient.connect({}, onConnected, (e: any) => console.log(e));
    }
  };

  useEffect(() => {
    connect();
  }, []);

  const sendMessage = async () => {
    const chatMessage = {
      sender: username,
      content: '한국 수도가 어디야?',
      type: 'CHAT',
    };

    try {
      const a = await stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
      console.log(a);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ResModal
      title={<ResModalTitle>질문 세부 설명</ResModalTitle>}
      width={1000}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <ResModalTalk ref={talkRef}>
        {talk?.map((chat) => {
          const { myReq, gptRes } = chat;

          return <ResFormChat myReq={myReq} gptRes={gptRes} />;
        })}
        <button onClick={sendMessage}>클릭</button>
      </ResModalTalk>

      <ResModalInput onSubmit={onSubmit}>
        <Input value={req} onChange={onChangeReq} placeholder={'질문을 입력해주세요.'} height={4} />
        <Button type={'submit'} color={'white'} fontSize={1.6} width={8} height={4} bgColor={main}>
          전송
        </Button>
      </ResModalInput>
    </ResModal>
  );
}
