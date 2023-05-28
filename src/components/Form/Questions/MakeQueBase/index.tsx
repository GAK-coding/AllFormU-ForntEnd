import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
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
import FormInput from '../../../ui/FormInput';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Select, Switch } from 'antd';
import {
  nowFocusIndex,
  nowQuestion,
  queSectionNum,
  questions,
  questionTypes,
  sectionLens,
} from '../../../../recoil/MakeForm/atom';
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
} from '../../../../typings/makeForm';
import DescriptionBox from '../QueTypes/DescriptionBox';
import SelectionBox from '../QueTypes/SelectionBox';
import GridBox from '../QueTypes/GridBox';
import { useMessage } from '../../../../hooks/useMessage';
import { useLocation, useParams } from 'react-router-dom';
import DescriptRes from '../../DirectResForm/DescriptionRes';
import SelectionRes from '../../DirectResForm/SelectionRes';
import { selectInfoUpdate } from '../../../../api/editForm';
import { useMutation } from 'react-query';

interface Props {
  data: DescriptionQue | SelectionQue | GridQue;
  row: number;
  col: number;
  isClick: boolean;
  onClickQue: (row: number, col: number) => void;
  onDelete: (row: number, col: number) => void;
  // onChangeTitle?: (e: ChangeEvent<HTMLInputElement>, name: 'title', row: number, col: number) => void;
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

export default function MakeQueBase({ onClickQue, data, row, col, isClick, onDelete }: Props) {
  const { title, type } = data;
  const [questionList, setQuestionList] = useRecoilState(questions);
  const queTypes = useRecoilValue(questionTypes);
  const [nowQueInfo, setNowQueInfo] = useRecoilState(nowQuestion);
  const [nowIndex, setNowIndex] = useRecoilState(nowFocusIndex);
  const accrueQue = useRecoilValue(sectionLens);
  const [queSecNum, setQueSecNum] = useRecoilState(queSectionNum);
  const [nowType, setNowType] = useState(type);
  const [nowSection, setNowSection] = useState('');
  const [isChange, setIsChange] = useState(false);
  const { showMessage, contextHolder } = useMessage();
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();

  const selectOpt: SectionType[] = queSecNum.map((opt) => {
    if (+opt.value === row) {
      return { ...opt, disabled: true };
    } else return opt;
  });

  const onSelectSectionNum = useCallback(
    (option: SectionType) => {
      if (nowQueInfo['row'] === 0 && questionList[0].length === 1) {
        showMessage('warning', '첫번째 섹션의 질문 개수가 1개일 경우 해당 질문을 옮길 수 없습니다.');
        return;
      }

      const opt = { ...option };

      setNowSection(opt['value']);
      setIsChange(true);
    },
    [nowQueInfo]
  );

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
          (temp[row][col] as SelectionQue).options = [...Array(11)].map((_, i) => ({ content: `${i}` }));
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

  const { mutate: requiredChangeMutate } = useMutation((required: boolean) =>
    selectInfoUpdate(+id!, data.id!, data.title, required)
  );

  const onChangeRequire = useCallback(
    (checked: boolean) => {
      if (pathname.slice(1, 16) === 'mypage/editform') {
        requiredChangeMutate(checked);
        showMessage('success', '필수 응답 변경!');
      } else {
        const temp: (DescriptionQue | SelectionQue | GridQue)[][] = JSON.parse(JSON.stringify(questionList));
        temp[row][col]['required'] = checked;
        setQuestionList(temp);
      }
    },
    [questionList]
  );

  const onEditTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const temp = JSON.parse(JSON.stringify(questionList));
      temp[row][col]['title'] = e.target.value;
      setQuestionList(temp);
    },
    [questionList]
  );

  useEffect(() => {
    if (isChange) {
      const temp: (DescriptionQue | SelectionQue | GridQue)[][] = JSON.parse(JSON.stringify(questionList));
      const tempQueSecNum: SectionType[] = JSON.parse(JSON.stringify(queSecNum));
      const value = nowSection;

      const [remove] = temp[row].splice(col, 1);
      remove.sectionNum = +value;
      temp[+value].push(remove);

      const index =
        +value === 0
          ? temp[0].length - 1
          : +value > row
          ? accrueQue[+value - 1] + temp[+value].length - 1
          : accrueQue[+value - 1] + temp[+value].length;

      if (temp[row].length === 0) {
        temp.splice(row, 1);
        tempQueSecNum.pop();
      }

      setQuestionList(temp);
      setQueSecNum(tempQueSecNum);
      setNowQueInfo({ row: +value, col: temp[+value].length - 1 });
      setNowIndex(index);
      setIsChange(false);
    }
  }, [isChange, questionList, queSecNum, nowSection, nowQueInfo, nowIndex, accrueQue]);

  if (pathname.slice(1, 10) === 'directres') {
    if (queTypes['Description'].includes(data.type))
      return (
        <DescriptRes onClickQue={onClickQue} data={data as DescriptionQue} row={row} col={col} isClick={isClick} />
      );
    if (queTypes['Selection'].includes(data.type))
      return <SelectionRes onClickQue={onClickQue} data={data as SelectionQue} row={row} col={col} isClick={isClick} />;
  }

  return (
    <QueWrapper>
      {contextHolder}
      <DeleteBtn onClick={() => onDelete(row, col)}>
        <GrFormClose />
      </DeleteBtn>
      <QueBody onClick={() => onClickQue(row, col)}>
        {isClick && <CheckMark />}
        <QueTop>
          <QueTopLeft>
            <FormInput
              onChange={onEditTitle}
              queId={data.id}
              value={title}
              width={'75%'}
              fontSize={1.6}
              placeholder={'질문'}
            />
          </QueTopLeft>
          <QueTopRight>
            {pathname.slice(8, 16) !== 'editform' && (
              <Select
                className="custom-select"
                defaultValue={type}
                style={{ width: 135 }}
                onChange={onChangeType}
                options={Types}
                suffixIcon={<TbTriangleInverted />}
              />
            )}
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
            {pathname.slice(8, 16) !== 'editform' && (
              <div>
                <span>섹션</span>
                <Select
                  className="custom-select"
                  value={`${queSecNum[row].value}`}
                  style={{ width: 60 }}
                  onSelect={(value, option) => onSelectSectionNum(option)}
                  options={selectOpt}
                  suffixIcon={<TbTriangleInverted />}
                  size={'small'}
                />
              </div>
            )}
            <div>
              <span>필수 응답</span>
              <Switch defaultChecked={data.required} onChange={onChangeRequire} size={'small'} />
            </div>
          </QueBottomRight>
        </QueBottom>
      </QueBody>
    </QueWrapper>
  );
}
