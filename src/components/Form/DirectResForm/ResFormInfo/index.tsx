import React from 'react';
import { useRecoilState } from 'recoil';
import { formInfo } from '../../../../recoil/MakeForm/atom';
import { QueWrapper } from '../../Questions/MakeQueBase/styles';
import { ResFormInfoWrapper } from './styles';

export default function ResFormInfo() {
  const [info, setInfo] = useRecoilState(formInfo);

  return (
    <QueWrapper style={{ backgroundColor: '#F5F5F5' }}>
      <ResFormInfoWrapper>
        <h1>{info.title}</h1>
        <img src={info.fimage} alt="이미지" />
        <div>{info.content}</div>
      </ResFormInfoWrapper>
    </QueWrapper>
  );
}
