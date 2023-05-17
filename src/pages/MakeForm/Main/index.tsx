import React, { useCallback, useState } from 'react';
import { MakeFormBottom, MakeFormTop, MakeFormWrapper } from './styles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../../recoil/User/atom';
import {
  formFix,
  formInfo,
  nowFocusIndex,
  nowQuestion,
  queSectionNum,
  questions,
  sectionLens,
  sectionNames,
} from '../../../recoil/MakeForm/atom';
import { DESCRIPTION_SHORT } from '../../../typings/makeForm';
import { v4 as uuid } from 'uuid';

export default function MakeForm() {
  const setQuestionList = useSetRecoilState(questions);
  const setInfo = useSetRecoilState(formInfo);
  const setSecNames = useSetRecoilState(sectionNames);
  const setLens = useSetRecoilState(sectionLens);
  const setFix = useSetRecoilState(formFix);
  const setNowQueInfo = useSetRecoilState(nowQuestion);
  const setNotIndex = useSetRecoilState(nowFocusIndex);
  const setQueSecNum = useSetRecoilState(queSectionNum);

  const { lightPurple } = useRecoilValue(color);
  const navigate = useNavigate();
  const { nickname } = useRecoilValue(userInfo);

  const onClickBase = useCallback(() => {
    navigate('/makeform/select');
    setQuestionList([
      [
        {
          type: DESCRIPTION_SHORT,
          tempId: uuid(),
          required: false,
          title: '',
          sectionNum: 0,
          descriptions: [{ content: '' }],
        },
      ],
    ]);
    setInfo({ title: '', content: '' });
    setSecNames(['']);
    setLens([]);
    setFix(false);
    setNowQueInfo({ row: 0, col: 0 });
    setNotIndex(0);
    setQueSecNum([{ value: '0', label: '1' }]);
  }, []);

  return (
    <MakeFormWrapper>
      <MakeFormTop>
        <div>
          <span>{nickname}&nbsp;</span>님 안녕하세요 😊
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
          <img src="/images/Gak.png" alt={'Gak'} />
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
