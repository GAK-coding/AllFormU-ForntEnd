import React, { ChangeEvent, useCallback } from 'react';
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
import { TbTriangleInverted } from 'react-icons/tb';
import { GrFormClose } from 'react-icons/gr';
import { questions } from '../../../recoil/MakeForm/atom';

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
];

export default function ShortQuestion({ data, index, click, onDelete }: Props) {
  const { blue } = useRecoilValue(color);
  const { title, answer } = data;
  const [questionList, setQuestionList] = useRecoilState(questions);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, name: 'title' | 'answer') => {
      const temp = JSON.parse(JSON.stringify(questionList));
      temp[index][name] = e.target.value;
      console.log(temp);
      setQuestionList(temp);
    },
    [questionList, data]
  );

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

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
          <ShortQueBottomLeft>
            <FormInput
              value={answer}
              onChange={(e) => onChange(e, 'answer')}
              width={'75%'}
              fontSize={1.6}
              placeholder={'단답형 텍스트'}
              disabled={true}
            />
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
