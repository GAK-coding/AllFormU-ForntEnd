import React, { ChangeEvent, useCallback, useState } from 'react';
import {
  CheckMark,
  QueBottom,
  QueBottomLeft,
  QueBody,
  QueTop,
  QueTopLeft,
  QueTopRight,
  QueWrapper,
  DeleteBtn,
  QueBottomRight,
} from './styles';
import FormInput from '../../ui/FormInput';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Select, Switch } from 'antd';
import { questions, questionTypes } from '../../../recoil/MakeForm/atom';
import { TbTriangleInverted } from 'react-icons/tb';
import { GrFormClose } from 'react-icons/gr';
import {
  DescriptionKinds,
  DescriptionQue,
  GridKinds,
  GridQue,
  SelectionKinds,
  SelectionQue,
} from '../../../typings/makeForm';
import DescriptionBox from '../QueTypes/DescriptionBox';
import SelectionBox from '../QueTypes/SelectionBox';
import GridBox from '../QueTypes/GridBox';

interface Props {
  data: DescriptionQue | SelectionQue | GridQue;
  index: number;
  isClick: boolean;
  onClickQue: (index: number) => void;
  onDelete: (index: number) => void;
}

type QueType = {
  value: string;
  label: string;
};

const Types: QueType[] = [
  { value: 'Description_short', label: '단답형' },
  { value: 'Description_long', label: '장문형' },
  { value: 'Description_date', label: '날짜' },
  { value: 'Description_time', label: '시간' },
  { value: 'Description_image', label: '이미지' },
  { value: 'Selection_selection', label: '객관식 질문' },
  { value: 'Selection_checkBox', label: '체크 박스' },
  { value: 'Selection_dropDown', label: '드롭 다운' },
  { value: 'Selection_linear', label: '선형 배율' },
  { value: 'Grid_radio', label: '객관식 그리드' },
  { value: 'Grid_checkBox', label: '체크박스 그리드' },
];

export default function MakeQueBase({ onClickQue, data, index, isClick, onDelete }: Props) {
  const { title, type } = data;
  const [questionList, setQuestionList] = useRecoilState(questions);
  const queTypes = useRecoilValue(questionTypes);
  const [nowType, setNowType] = useState(type);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, name: 'title' | 'answer') => {
      const temp = JSON.parse(JSON.stringify(questionList));
      temp[index][name] = e.target.value;
      setQuestionList(temp);
    },
    [questionList, data]
  );

  const onChangeType = useCallback(
    (value: DescriptionKinds | SelectionKinds | GridKinds) => {
      setNowType(value);
      const temp = JSON.parse(JSON.stringify(questionList));
      temp[index].type = value;

      if (queTypes['Description'].includes(value)) {
        !!temp[index]['options'] && delete temp[index]['options'];
        !!temp[index]['rows'] && delete temp[index]['rows'];
        !!temp[index]['cols'] && delete temp[index]['cols'];
      }

      if (queTypes['Selection'].includes(value)) {
        !!temp[index]['rows'] && delete temp[index]['rows'];
        !!temp[index]['cols'] && delete temp[index]['cols'];
        !temp[index]['options'] && (temp[index]['options'] = ['']);

        if (value === 'Selection_linear') {
          (temp[index] as SelectionQue).options = ['0', '10'];
        }
      }

      if (queTypes['Grid'].includes(value)) {
        !!temp[index]['options'] && delete temp[index]['options'];
        !temp[index]['rows'] && (temp[index]['rows'] = []);
        !temp[index]['cols'] && (temp[index]['cols'] = []);
      }

      // if (value === 'Selection_linear') {
      //   (temp[index] as SelectionQue).options = ['0', '10'];
      // }

      setQuestionList(temp);
    },
    [questionList]
  );

  const onChangeRequire = useCallback(
    (checked: boolean) => {
      const temp = JSON.parse(JSON.stringify(questionList));
      temp[index]['require'] = checked;
      setQuestionList(temp);
    },
    [questionList]
  );

  console.log(questionList);

  return (
    <QueWrapper>
      <DeleteBtn onClick={() => onDelete(index)}>
        <GrFormClose />
      </DeleteBtn>
      <QueBody onClick={() => onClickQue(index)}>
        {isClick && <CheckMark />}
        <QueTop>
          <QueTopLeft>
            <FormInput
              value={title}
              onChange={(e) => onChange(e, 'title')}
              width={'75%'}
              fontSize={1.6}
              placeholder={'질문'}
            />
          </QueTopLeft>
          <QueTopRight>
            <Select
              className="custom-select"
              defaultValue={type}
              style={{ width: 135 }}
              onChange={onChangeType}
              options={Types}
              suffixIcon={<TbTriangleInverted />}
            />
          </QueTopRight>
        </QueTop>
        <QueBottom>
          <QueBottomLeft>
            {queTypes['Description'].includes(nowType) && <DescriptionBox type={nowType} />}
            {queTypes['Selection'].includes(nowType) && <SelectionBox data={data as SelectionQue} index={index} />}
            {queTypes['Grid'].includes(nowType) && <GridBox data={data as GridQue} index={index} />}
          </QueBottomLeft>
          <QueBottomRight>
            <span>필수 응답</span>
            <Switch onChange={onChangeRequire} size={'small'} />
          </QueBottomRight>
        </QueBottom>
      </QueBody>
    </QueWrapper>
  );
}
