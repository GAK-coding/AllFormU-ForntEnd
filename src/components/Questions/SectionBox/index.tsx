import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { SectionBoxWrapper } from './styles';
import FormInput from '../../ui/FormInput';
import { Select } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  changeSection,
  nowFocusIndex,
  nowQuestion,
  questions,
  sectionLens,
  sectionNames,
} from '../../../recoil/MakeForm/atom';
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
  const [sectionList, setSectionList] = useRecoilState(sectionNames);
  const [nowIndex, setNowIndex] = useRecoilState(nowFocusIndex);
  const accrueQue = useRecoilValue(sectionLens);
  const [nowQueInfo, setNowQueInfo] = useRecoilState(nowQuestion);

  const onChangeSectionName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const temp = JSON.parse(JSON.stringify(sectionList));
      temp[index] = e.target.value;
      setSectionList(temp);
    },
    [sectionList]
  );

  const onChangeSection = useCallback(
    (value: string) => {
      const temp = JSON.parse(JSON.stringify(questionList));
      const sectionName = JSON.parse(JSON.stringify(sectionList));

      const [target] = temp.splice(index, 1);
      temp.splice(+value, 0, target);
      const [targetName] = sectionName.splice(index, 1);
      sectionName.splice(+value, 0, targetName);

      let idx = 0;
      let count = 0;
      if (+value !== 0) {
        for (let i = 0; i < +value; i++) {
          count += temp[i].length;
        }
        idx = count;
      }

      setQuestionList(temp);
      setSectionList(sectionName);
      setIsChange(true);
      setNowIndex(idx);
      setNowQueInfo({ row: +value, col: 0 });
    },
    [questionList, setQuestionList, isChange, sectionList, nowIndex, accrueQue, nowQueInfo]
  );

  useEffect(() => {
    const temp: { value: number; label: number; disabled: boolean }[] = [];
    for (let i = 0; i < questionList.length; i++) {
      temp.push({ value: i, label: i + 1, disabled: i === index });
    }
    setOption(temp);
  }, [questionList, index]);

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
        <FormInput
          value={sectionList[index]}
          onChange={onChangeSectionName}
          width={'50%'}
          fontSize={1.8}
          placeholder={'섹션 이름'}
        />
        <span>
          <span>섹션 순서</span>
          <Select value={`${index + 1}`} style={{ width: 100 }} onChange={onChangeSection} options={option} />
        </span>
      </div>
      {children}
    </SectionBoxWrapper>
  );
}
