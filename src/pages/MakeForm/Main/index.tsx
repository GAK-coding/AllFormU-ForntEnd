import React, { useCallback, useState } from 'react';
import { MakeFormBottom, MakeFormTop, MakeFormWrapper } from './styles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../../recoil/User/atom';

export default function MakeForm() {
  const { lightPurple } = useRecoilValue(color);
  const navigate = useNavigate();
  // const { nickname } = useRecoilValue(userInfo);
  const [user, setUser] = useRecoilState(userInfo);

  const onClickBase = useCallback(() => {
    navigate('/makeform/chatbot');
  }, []);

  return (
    <MakeFormWrapper>
      <MakeFormTop>
        <div>
          <span>{user.nickname}&nbsp;</span>님 안녕하세요 😊
        </div>
        <div>설문생성 형식을 선택해 주세요.</div>
      </MakeFormTop>
      <MakeFormBottom>
        <Button
          onClick={onClickBase}
          color={'black'}
          bgColor={lightPurple}
          fontSize={2}
          width={25}
          height={15}
          radius={2}
        >
          <img src="/images/gak.png" alt={'Gak'} />
          <span>챗봇</span>
        </Button>
        <Button
          onClick={() => {
            navigate('/makeform/select');
          }}
          color={'black'}
          bgColor={lightPurple}
          fontSize={2}
          width={25}
          height={15}
          radius={2}
        >
          <img src="/images/pen.png" alt={'Pen'} />
          <span>직접 작성</span>
        </Button>
      </MakeFormBottom>
    </MakeFormWrapper>
  );
}
