import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
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
import { nowQuestion, queSectionNum, questions, questionTypes, sectionLens } from '../../../recoil/MakeForm/atom';
import { TbTriangleInverted } from 'react-icons/tb';
import { GrFormClose } from 'react-icons/gr';
import {
  DESCRIPTION_DATE,
  DESCRIPTION_IMG,
  DESCRIPTION_LONG,
  DESCRIPTION_SHORT,
  DESCRIPTION_TIME,
  DescriptionKinds,
  DescriptionQue,
  GRID_CHECKBOX,
  GRID_RADIO,
  GridKinds,
  GridQue,
  QueType,
  SectionType,
  SELECTION_CHECKBOX,
  SELECTION_DROPDOWN,
  SELECTION_LINEAR,
  SELECTION_OPTION,
  SelectionKinds,
  SelectionQue,
} from '../../../typings/makeForm';
import DescriptionBox from '../QueTypes/DescriptionBox';
import SelectionBox from '../QueTypes/SelectionBox';
import GridBox from '../QueTypes/GridBox';

interface Props {
  data: DescriptionQue | SelectionQue | GridQue;
  row: number;
  col: number;
  isClick: boolean;
  onClickQue: (row: number, col: number) => void;
  onDelete: (row: number, col: number) => void;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>, name: 'title', row: number, col: number) => void;
  // onChangeSectionNum: (value: string, row: number, col: number) => void;
}

const Types: QueType[] = [
  { value: DESCRIPTION_SHORT, label: '단답형' },
  { value: DESCRIPTION_LONG, label: '장문형' },
  { value: DESCRIPTION_DATE, label: '날짜' },
  { value: DESCRIPTION_TIME, label: '시간' },
  { value: DESCRIPTION_IMG, label: '이미지' },
  { value: SELECTION_OPTION, label: '객관식 질문' },
  { value: SELECTION_CHECKBOX, label: '체크 박스' },
  { value: SELECTION_DROPDOWN, label: '드롭 다운' },
  { value: SELECTION_LINEAR, label: '선형 배율' },
  { value: GRID_RADIO, label: '객관식 그리드' },
  { value: GRID_CHECKBOX, label: '체크박스 그리드' },
];

export default function MakeQueBase({
  onClickQue,
  data,
  row,
  col,
  isClick,
  onDelete,
  onChangeTitle,
}: // onChangeSectionNum,
Props) {
  const { title, type } = data;
  const [questionList, setQuestionList] = useRecoilState(questions);
  const queTypes = useRecoilValue(questionTypes);
  const [nowQueInfo, setNowQueInfo] = useRecoilState(nowQuestion);
  const [queSecNum, setQueSecNum] = useRecoilState(queSectionNum);
  const [nowType, setNowType] = useState(type);

  const [test, setTest] = useState(-1);

  const onChangeSectionNum = useCallback(
    (value: string) => {
      const temp = JSON.parse(JSON.stringify(questionList));

      const [remove] = temp[row].splice(col, 1);
      remove.sectionNum = +value;
      temp[+value].push(remove);

      if (temp[row].length === 0) {
        temp.splice(row, 1);
      }
      setQuestionList(temp);
      setNowQueInfo({ row: parseInt(value), col: temp[parseInt(value)].length - 1 });
      setTest(parseInt(value));
    },
    [questionList, nowQueInfo, test]
  );

  console.log(test);

  const onChangeType = useCallback(
    (value: DescriptionKinds | SelectionKinds | GridKinds) => {
      setNowType(value);
      const temp = JSON.parse(JSON.stringify(questionList));
      temp[row][col].type = value;

      if (queTypes['Description'].includes(value)) {
        !!temp[row][col]['options'] && delete temp[row][col]['options'];
        !!temp[row][col]['rows'] && delete temp[row][col]['rows'];
        !!temp[row][col]['cols'] && delete temp[row][col]['cols'];
      } else if (queTypes['Selection'].includes(value)) {
        !!temp[row][col]['descriptions'] && delete temp[row][col]['descriptions'];
        !!temp[row][col]['rows'] && delete temp[row][col]['rows'];
        !!temp[row][col]['cols'] && delete temp[row][col]['cols'];
        !temp[row][col]['options'] && (temp[row][col]['options'] = [{ content: '' }]);

        if (value === SELECTION_LINEAR) {
          (temp[row][col] as SelectionQue).options = [{ content: '0' }, { content: '10' }];
        }
      } else if (queTypes['Grid'].includes(value)) {
        !!temp[row][col]['descriptions'] && delete temp[row][col]['descriptions'];
        !!temp[row][col]['options'] && delete temp[row][col]['options'];
        !temp[row][col]['rows'] && (temp[row][col]['rows'] = []);
        !temp[row][col]['cols'] && (temp[row][col]['cols'] = []);
      }

      setQuestionList(temp);
    },
    [questionList]
  );

  const onChangeRequire = useCallback(
    (checked: boolean) => {
      const temp = JSON.parse(JSON.stringify(questionList));
      temp[row][col]['require'] = checked;
      setQuestionList(temp);
    },
    [questionList]
  );

  return (
    <QueWrapper>
      <DeleteBtn onClick={() => onDelete(row, col)}>
        <GrFormClose />
      </DeleteBtn>
      <QueBody onClick={() => onClickQue(row, col)}>
        {isClick && <CheckMark />}
        <QueTop>
          <QueTopLeft>
            <FormInput
              value={title}
              onChange={(e) => onChangeTitle(e, 'title', row, col)}
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
            {queTypes['Selection'].includes(nowType) && (
              <SelectionBox data={data as SelectionQue} row={row} col={col} />
            )}
            {queTypes['Grid'].includes(nowType) && <GridBox data={data as GridQue} row={row} col={col} />}
          </QueBottomLeft>
          <QueBottomRight>
            <div>
              <span>섹션</span>
              <Select
                className="custom-select"
                value={`${queSecNum[row].value}`}
                style={{ width: 60 }}
                onChange={onChangeSectionNum}
                options={queSecNum}
                suffixIcon={<TbTriangleInverted />}
              />
            </div>
            <div>
              <span>필수 응답</span>
              <Switch onChange={onChangeRequire} size={'small'} />
            </div>
          </QueBottomRight>
        </QueBottom>
      </QueBody>
    </QueWrapper>
  );
}
