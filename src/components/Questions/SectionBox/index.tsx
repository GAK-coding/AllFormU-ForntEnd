import React, { useCallback, useEffect, useState } from 'react';
import { SectionBoxWrapper } from './styles';
import FormInput from '../../ui/FormInput';
import { Select } from 'antd';
import { useRecoilState } from 'recoil';
import { changeSection, questions } from '../../../recoil/MakeForm/atom';
import { DescriptionQue, GridQue, SelectionQue } from '../../../typings/makeForm';

interface Props {
  children: React.ReactNode;
  index: number;
  section: DescriptionQue | SelectionQue | GridQue;
}

export default function SectionBox({ children, index, section }: Props) {
  const [questionList, setQuestionList] = useRecoilState(questions);
  const [option, setOption] = useState<{ value: number; label: number; disabled: boolean }[]>([]);
  const [isChange, setIsChange] = useRecoilState(changeSection);

  useEffect(() => {
    const temp: { value: number; label: number; disabled: boolean }[] = [];
    for (let i = 0; i < questionList.length; i++) {
      temp.push({ value: i, label: i + 1, disabled: i === index });
    }
    setOption(temp);
  }, [questionList, index]);

  const onChangeSection = useCallback(
    (value: string) => {
      const temp = JSON.parse(JSON.stringify(questionList));
      const target = temp.splice(index, 1);
      temp.splice(+value, 0, target[0]);
      setQuestionList(temp);

      setIsChange(true);
    },
    [questionList, setQuestionList, isChange]
  );

  useEffect(() => {
    if (index === questionList.length - 1 && isChange) {
      const temp = JSON.parse(JSON.stringify(questionList));

      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].length; j++) {
          if (temp[i][j]['sectionNum'] === i) continue;
          temp[i][j]['sectionNum'] = i;
        }
      }

      setQuestionList(temp);
      setIsChange(false);
    }
  }, [questionList, option, onChangeSection, index, isChange]);

  return (
    <SectionBoxWrapper>
      <div>
        <FormInput value={''} onChange={(e) => console.log(e)} width={'50%'} fontSize={1.8} placeholder={'섹션 이름'} />
        <span>
          <span>섹션 순서</span>
          <Select
            value={`${section['sectionNum'] + 1}`}
            style={{ width: 100 }}
            onChange={onChangeSection}
            options={option}
          />
        </span>
      </div>
      {children}
    </SectionBoxWrapper>
  );
}
