import React, { ChangeEvent, useCallback, useState } from 'react';
import { BaseQuestionWrapper } from '../BaseQuestion/styles';
import {
  CheckMark,
  ShortQueBottom,
  ShortQueBottomLeft,
  ShortQuestionWrapper,
  ShortQueTop,
  ShortQueTopLeft,
  ShortQueTopRight,
} from './styles';
import { ShortQue } from '../../../typings/makeForm';
import FormInput from '../../ui/FormInput';
import Button from '../../ui/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { Select } from 'antd';
import { questions } from '../../../recoil/MakeForm/atom';
import { TbTriangleInverted } from 'react-icons/tb';
import { GrFormClose } from 'react-icons/gr';
import { BiTime } from 'react-icons/bi';
import { AiTwotoneCalendar } from 'react-icons/ai';

interface Props {
  data: ShortQue;
  index: number;
  click: boolean;
  onDelete: (index: number) => void;
}

type QueType = {
  value: string;
  label: string;
};

const Types: QueType[] = [
  { value: 'short', label: '단답형' },
  { value: 'long', label: '장문형' },
  { value: 'date', label: '날짜' },
  { value: 'time', label: '시간' },
];

const text: { [key: string]: React.ReactNode } = {
  short: <span>단답형 텍스트</span>,
  long: <span>장문형 텍스트</span>,
  date: (
    <span>
      <span>날짜</span>
      <span>
        <AiTwotoneCalendar />
      </span>
    </span>
  ),
  time: (
    <span>
      <span>시간</span>
      <span>
        <BiTime />
      </span>
    </span>
  ),
};

export default function ShortQuestion({ data, index, click, onDelete }: Props) {
  const { blue } = useRecoilValue(color);
  const { title, answer } = data;
  const [questionList, setQuestionList] = useRecoilState(questions);
  const [type, setType] = useState('short');

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, name: 'title' | 'answer') => {
      const temp = JSON.parse(JSON.stringify(questionList));
      temp[index][name] = e.target.value;
      setQuestionList(temp);
    },
    [questionList, data]
  );

  const handleChange = useCallback(
    (value: string) => {
      setType(value);
      const temp = JSON.parse(JSON.stringify(questionList));
      temp[index].type = value;
      setQuestionList(temp);
    },
    [questionList]
  );

  return (
    <BaseQuestionWrapper>
      <ShortQuestionWrapper>
        {click && <CheckMark />}
        <ShortQueTop>
          <ShortQueTopLeft>
            <FormInput
              value={title}
              onChange={(e) => onChange(e, 'title')}
              width={'75%'}
              fontSize={1.6}
              placeholder={'질문'}
            />
          </ShortQueTopLeft>
          <ShortQueTopRight>
            <Select
              className="custom-select"
              defaultValue="단답형"
              style={{ width: 100 }}
              onChange={handleChange}
              options={Types}
              suffixIcon={<TbTriangleInverted />}
            />
            <span onClick={() => onDelete(index)}>
              <GrFormClose />
            </span>
          </ShortQueTopRight>
        </ShortQueTop>
        <ShortQueBottom>
          <ShortQueBottomLeft type={type}>
            {text[type]}
            {/* <FormInput */}
            {/*   value={text[type]} */}
            {/*   // onChange={(e) => onChange(e, 'answer')} */}
            {/*   width={'75%'} */}
            {/*   fontSize={1.6} */}
            {/*   // placeholder={text[type]} */}
            {/*   disabled={true} */}
            {/* /> */}
            {/* <div> */}
            {/*   <Button color={'black'} bgColor={blue} fontSize={1.4} width={8} height={3.5}> */}
            {/*     추가 */}
            {/*   </Button> */}
            {/* </div> */}
          </ShortQueBottomLeft>
        </ShortQueBottom>
      </ShortQuestionWrapper>
    </BaseQuestionWrapper>
  );
}
