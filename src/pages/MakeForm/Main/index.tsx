import React from 'react';
import { MakeFormBottom, MakeFormTop, MakeFormWrapper } from './styles';
import { useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function MakeForm() {
  const { lightPurple } = useRecoilValue(color);
  const navigate = useNavigate();

  return (
    <MakeFormWrapper>
      <MakeFormTop>
        <div>
          <span>권오현</span>님 안녕하세요 😊
        </div>
        <div>설문생성 형식을 선택해 주세요.</div>
      </MakeFormTop>
      <MakeFormBottom>
        <Button
          onClick={() => navigate('/makeform/select')}
          color={'black'}
          bgColor={lightPurple}
          fontSize={2}
          width={25}
          height={15}
          radius={2}
        >
          <img src="/images/Gak.png" alt={'Gak'} />
          <span>챗봇</span>
        </Button>
        <Button
          onClick={() => navigate('/makeform/select')}
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
