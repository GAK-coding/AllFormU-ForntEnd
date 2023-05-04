import React, { ChangeEvent, useCallback, useEffect } from 'react';
import {
  SELECTION_CHECKBOX,
  SELECTION_DROPDOWN,
  SELECTION_LINEAR,
  SELECTION_OPTION,
  SelectionQue,
} from '../../../../typings/makeForm';
import FormInput from '../../../ui/FormInput';
import Button from '../../../ui/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../../../recoil/Color/atom';
import { questions } from '../../../../recoil/MakeForm/atom';
import { DeleteOption, DropDownWrapper, SelectionBoxWrapper } from './styles';
import { ImCheckboxUnchecked, ImRadioUnchecked } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { Select } from 'antd';

interface Props {
  data: SelectionQue;
  row: number;
  col: number;
}

export default function SelectionBox({ data, row, col }: Props) {
  const { blue } = useRecoilValue(color);
  const [questionList, setQuestionList] = useRecoilState(questions);
  const { options, type } = data;

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, num: number) => {
      const temp = JSON.parse(JSON.stringify(questionList));
      (temp[row][col] as SelectionQue).options[num] = e.target.value;
      setQuestionList(temp);
    },
    [questionList]
  );

  const addOption = useCallback(() => {
    const temp = JSON.parse(JSON.stringify(questionList));
    const isEtc = options[options.length - 1] === '기타';
    isEtc && (temp[row][col] as SelectionQue).options.pop();

    (temp[row][col] as SelectionQue).options.push('');

    isEtc && (temp[row][col] as SelectionQue).options.push('기타');
    setQuestionList(temp);
  }, [questionList]);

  const addEtc = useCallback(() => {
    if (options[options.length - 1] !== '기타') {
      const temp = JSON.parse(JSON.stringify(questionList));
      (temp[row][col] as SelectionQue).options.push('기타');
      setQuestionList(temp);
    }
  }, [questionList, data, row, col, options]);

  const onDelete = useCallback(
    (num: number) => {
      if (options.length === 1) return;

      const temp = JSON.parse(JSON.stringify(questionList));
      (temp[row][col] as SelectionQue).options.splice(num, 1);
      setQuestionList(temp);
    },
    [questionList]
  );

  const onChangeDropDown = useCallback(
    (value: string, num: number) => {
      const temp = JSON.parse(JSON.stringify(questionList));
      (temp[row][col] as SelectionQue).options[num] = value;
      setQuestionList(temp);
    },
    [questionList]
  );

  useEffect(() => {
    if (type === SELECTION_DROPDOWN && options[options.length - 1] === '기타') {
      const temp = JSON.parse(JSON.stringify(questionList));
      (temp[row][col] as SelectionQue).options.pop();
      setQuestionList(temp);
    }
  }, [questionList]);

  if (type === SELECTION_LINEAR) {
    return (
      <DropDownWrapper>
        <Select
          defaultValue="0"
          onChange={(e) => onChangeDropDown(e, 0)}
          style={{ width: 70 }}
          options={[
            { value: '0', label: '0' },
            { value: '1', label: '1' },
          ]}
        />
        <span>~</span>
        <Select
          defaultValue="10"
          onChange={(e) => onChangeDropDown(e, 1)}
          style={{ width: 70 }}
          options={[
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '6', label: '6' },
            { value: '7', label: '7' },
            { value: '8', label: '8' },
            { value: '9', label: '9' },
            { value: '10', label: '10' },
          ]}
        />
      </DropDownWrapper>
    );
  }

  return (
    <SelectionBoxWrapper>
      {options.map((option, idx) => (
        <div key={idx}>
          <span>
            {type === SELECTION_OPTION ? (
              <ImRadioUnchecked />
            ) : type === SELECTION_CHECKBOX ? (
              <ImCheckboxUnchecked />
            ) : (
              <>{idx + 1}</>
            )}
          </span>
          <FormInput
            value={option}
            onChange={(e) => onChange(e, idx)}
            width={'40%'}
            fontSize={1.6}
            placeholder={`옵션${idx + 1}`}
          />
          <DeleteOption onClick={() => onDelete(idx)}>
            <IoMdClose />
          </DeleteOption>
          {options.length - 1 === idx && (
            <div>
              <Button onClick={addOption} color={'black'} bgColor={blue} fontSize={1.4} width={8} height={3.5}>
                추가
              </Button>
              {type !== SELECTION_DROPDOWN && (
                <Button onClick={addEtc} color={'black'} bgColor={blue} fontSize={1.4} width={8} height={3.5}>
                  기타
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </SelectionBoxWrapper>
  );
}
