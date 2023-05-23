import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ResModal, ResModalInput, ResModalTalk, ResModalTitle } from './styles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ResFormChat from '../GPTModalChat';
import { message } from 'antd';
import { color } from '../../../recoil/Color/atom';
import { gptLoading, gptTalks } from '../../../recoil/Gpt/atom';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

interface Props {
  open: boolean;
  onCancel: () => void;
  sendMessage: (req: string) => void;
}

export default function GPTModal({ open, onCancel, sendMessage }: Props) {
  const { purple } = useRecoilValue(color);
  const [talk, setTalk] = useRecoilState(gptTalks);
  const [req, setReq] = useState('');
  const [loading, setLoading] = useRecoilState(gptLoading);

  const onChangeReq = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setReq(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (loading) {
        alert('gpt에게 답장이 오고 이용해주세요.');
        return;
      }

      if (req.length > 300) {
        message.warning('입력된 값이 300자 초과입니다.');
        return;
      }

      setLoading(true);

      setTalk((prev) => [...prev, { myReq: req, gptRes: null }]);
      setReq('');

      sendMessage(req);
    },
    [req, talk, loading]
  );

  const talkRef = useRef<HTMLDivElement>(null); // Ref 생성
  useEffect(() => {
    talkRef.current?.scrollTo(0, talkRef.current.scrollHeight); // Ref를 사용하여 스크롤 내리기
  }, [talk]); // talk 상태가 변경될 때마다 실행

  return (
    <ResModal
      title={<ResModalTitle>GPT 이용하기</ResModalTitle>}
      width={1000}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <ResModalTalk ref={talkRef}>
        {talk?.map((chat, idx) => {
          const { myReq, gptRes } = chat;

          return <ResFormChat key={idx} myReq={myReq} gptRes={gptRes} />;
        })}
      </ResModalTalk>

      <ResModalInput onSubmit={onSubmit}>
        <Input value={req} onChange={onChangeReq} placeholder={'질문을 입력해주세요.'} height={2.5} />
        <Button type={'submit'} color={'white'} fontSize={1.6} width={8} height={4} bgColor={purple}>
          전송
        </Button>
      </ResModalInput>
    </ResModal>
  );
}
