import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { DeleteOption, DropDownWrapper, SelectionBoxWrapper } from './styles';
import { ImCheckboxUnchecked, ImRadioUnchecked } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { Select } from 'antd';
import {
  SELECTION_CHECKBOX,
  SELECTION_DROPDOWN,
  SELECTION_LINEAR,
  SELECTION_OPTION,
  SelectionQue,
} from '../../../../../typings/makeForm';
import { color } from '../../../../../recoil/Color/atom';
import { questions, questionTypes } from '../../../../../recoil/MakeForm/atom';
import Button from '../../../../ui/Button';
import FormInput from '../../../../ui/FormInput';
import { useLocation, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { addContent, deleteContent, updateContent, updateLinear } from '../../../../../api/editForm';
import { useMessage } from '../../../../../hooks/useMessage';
import { linearList } from '../../../../../utils/linearList';

interface Props {
  data: SelectionQue;
  row: number;
  col: number;
}

export default function SelectionBox({ data, row, col }: Props) {
  const { blue } = useRecoilValue(color);
  const [questionList, setQuestionList] = useRecoilState(questions);
  const { options, type } = data;
  const { pathname } = useLocation();
  const { showMessage, contextHolder } = useMessage();
  const [isLinearChange, setIsLinearChange] = useState(false);
  const [addLast, setAddLast] = useState(false);
  const [range, setRange] = useState(-1);

  const { mutate: deleteContentMutate } = useMutation((optId: number) => deleteContent(optId));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, num: number) => {
      const temp = JSON.parse(JSON.stringify(questionList));
      (temp[row][col] as SelectionQue).options[num].content = e.target.value;
      setQuestionList(temp);
    },
    [questionList]
  );

  const addOption = useCallback(() => {
    const temp = JSON.parse(JSON.stringify(questionList));
    const isEtc = options[options.length - 1].content === '기타';
    isEtc && (temp[row][col] as SelectionQue).options.pop();

    (temp[row][col] as SelectionQue).options.push({ content: '' });

    isEtc && (temp[row][col] as SelectionQue).options.push({ content: '기타' });
    setQuestionList(temp);
  }, [questionList]);

  const addEtc = useCallback(() => {
    if (options[options.length - 1].content !== '기타') {
      const temp = JSON.parse(JSON.stringify(questionList));
      (temp[row][col] as SelectionQue).options.push({ content: '기타' });
      setQuestionList(temp);
    }
  }, [questionList, data, row, col, options]);

  const onDelete = useCallback(
    (num: number, optId?: number, linear?: boolean) => {
      if (options.length === 1) {
        showMessage('error', '옵션은 최소 1개 이상이어야 합니다.');
        return;
      }

      if (pathname.slice(1, 16) !== 'mypage/editform') {
        const temp = JSON.parse(JSON.stringify(questionList));
        (temp[row][col] as SelectionQue).options.splice(num, 1);
        setQuestionList(temp);
      } else {
        const temp = JSON.parse(JSON.stringify(questionList));
        temp[row][col].options.splice(num, 1);
        setQuestionList(temp);

        deleteContentMutate(optId!);

        !linear && showMessage('success', '옵션 삭제 완료!');
      }
    },
    [questionList]
  );

  function createArray(start: number, end: number): string[] {
    const arr: string[] = [];

    for (let i = start; i <= end; i++) {
      arr.push(i.toString());
    }

    return arr;
  }

  const { mutate: updateLinearMutate } = useMutation(
    (content: string[]) => updateLinear({ queId: data.id!, content }),
    {
      onSuccess: (data) => {
        const temp = JSON.parse(JSON.stringify(questionList));
        temp[row][col].options = data;
        setQuestionList(temp);
      },
    }
  );

  const onChangeLinear = useCallback(
    async (value: string, num: number) => {
      if (pathname.slice(1, 16) === 'mypage/editform') {
        let start = data?.options[0].content;
        let end = data?.options[data?.options.length - 1].content;
        num === 0 ? (start = value) : (end = value);

        updateLinearMutate(createArray(+start, +end));
      } else {
        const temp = JSON.parse(JSON.stringify(questionList));
        let start = (temp[row][col] as SelectionQue).options[0].content;
        let end = (temp[row][col] as SelectionQue).options[(temp[row][col] as SelectionQue).options.length - 1].content;

        num === 0 ? (start = value) : (end = value);

        const opt: { content: string }[] = [];

        for (let i = +start; i <= +end; i++) {
          opt.push({ content: i.toString() });
        }

        (temp[row][col] as SelectionQue).options = opt;

        setQuestionList(temp);
      }
    },
    [questionList, isLinearChange, addLast, range]
  );

  useEffect(() => {
    if (type === SELECTION_DROPDOWN && options[options.length - 1].content === '기타') {
      const temp = JSON.parse(JSON.stringify(questionList));
      (temp[row][col] as SelectionQue).options.pop();
      setQuestionList(temp);
    }
  }, [questionList]);

  if (type === SELECTION_LINEAR) {
    return (
      <DropDownWrapper>
        {contextHolder}
        <Select
          defaultValue={`${pathname.slice(1, 16) !== 'mypage/editform' ? 0 : data?.options[0].content || 0}`}
          onChange={(e) => onChangeLinear(e, 0)}
          style={{ width: 70 }}
          options={linearList(0, 1)}
        />
        <span>~</span>
        <Select
          defaultValue={`${
            pathname.slice(1, 16) !== 'mypage/editform' ? 10 : data?.options[data?.options.length - 1].content || 10
          }`}
          onChange={(e) => onChangeLinear(e, 1)}
          style={{ width: 70 }}
          options={linearList(2, 10)}
        />
      </DropDownWrapper>
    );
  }

  return (
    <SelectionBoxWrapper>
      {contextHolder}
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
            value={option.content}
            onChange={(e) => onChange(e, idx)}
            width={'40%'}
            fontSize={1.6}
            placeholder={`옵션${idx + 1}`}
            queId={data.id}
            optId={option.id}
            row={row}
            col={col}
          />
          <DeleteOption onClick={() => onDelete(idx, option.id!)}>
            <IoMdClose />
          </DeleteOption>
          {options.length - 1 === idx && (
            <div>
              <Button onClick={addOption} color={'black'} bgColor={blue} fontSize={1.4} width={8} height={3.5}>
                추가
              </Button>
              {type !== SELECTION_DROPDOWN && pathname.slice(1, 16) !== 'mypage/editform' && (
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
