import React, { useCallback, useEffect, useState } from 'react';
import { SectionBoxWrapper } from './styles';
import FormInput from '../../ui/FormInput';
import { Select } from 'antd';
import { useRecoilState } from 'recoil';
import { questions } from '../../../recoil/MakeForm/atom';

interface Props {
  children: React.ReactNode;
  index: number;
}

export default function SectionBox({ children, index }: Props) {
  const [questionList, setQuestionList] = useRecoilState(questions);
  const [option, setOption] = useState<{ value: number; label: number; disabled: boolean }[]>([]);
  const [idx, setIdx] = useState(index);

  const onChangeSection = useCallback(
    (value: string) => {
      const temp = JSON.parse(JSON.stringify(questionList));
      const target = temp.splice(index, 1);
      temp.splice(+value, 0, target[0]);
      setQuestionList(temp);
      setIdx(+value);
    },
    [questionList, option, idx]
  );

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < questionList.length; i++) {
      temp.push({ value: i, label: i + 1, disabled: i === index });
    }
    setOption(temp);
  }, [index, questionList]);

  // console.log(questionList);
  // console.log(option);
  console.log('인덱스: ', index);

  return (
    <SectionBoxWrapper>
      <div>
        <FormInput value={''} onChange={(e) => console.log(e)} width={'50%'} fontSize={1.8} placeholder={'섹션 이름'} />
        <span>
          <span>섹션 순서</span>
          <Select defaultValue={`${idx + 1}`} style={{ width: 100 }} onChange={onChangeSection} options={option} />
        </span>
      </div>
      {children}
    </SectionBoxWrapper>
  );
}
