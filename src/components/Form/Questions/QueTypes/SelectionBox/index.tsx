import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { DeleteOption, DropDownWrapper, SelectionBoxWrapper } from './styles';
import { ImCheckboxUnchecked, ImRadioUnchecked } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import { Select } from 'antd';
import {
  Option,
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
import { useMutation } from 'react-query';
import { addContent, deleteContent } from '../../../../../api/editForm';
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
  const { mutate: deleteContentMutate } = useMutation((optId: number) => deleteContent(optId));
  const { showMessage, contextHolder } = useMessage();
  const [optDataTemp, setOptDataTemp] = useState<Option[]>([]);
  const [isLinearChange, setIsLinearChange] = useState(false);
  const { id } = useParams();

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
      if (options.length === 1) return;

      if (pathname.slice(1, 16) !== 'mypage/editform') {
        const temp = JSON.parse(JSON.stringify(questionList));
        (temp[row][col] as SelectionQue).options.splice(num, 1);
        setQuestionList(temp);
      } else {
        const temp = JSON.parse(JSON.stringify(questionList));
        temp[row][col].options.splice(num, 1);
        setQuestionList(temp);

        deleteContentMutate(optId!);
        !!linear && showMessage('success', '옵션 삭제 완료!');
      }
    },
    [questionList]
  );

  const onChangeLinear = useCallback(
    (value: string, num: number) => {
      if (pathname.slice(1, 16) === 'mypage/editform') {
        setOptDataTemp(data.options);
        setIsLinearChange(true);
      }
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
    },
    [questionList, optDataTemp, isLinearChange]
  );

  console.log(questionList);
  const { mutate: addContentMutate } = useMutation((value: string) => addContent({ queId: data.id!, content: value }), {
    // onSuccess: (data) => {
    //   setPushOptId(data!);
    // },
  });

  useEffect(() => {
    if (data.type === SELECTION_LINEAR && isLinearChange) {
      optDataTemp.map((opt) => {
        onDelete(+id!, opt.id, true);
      });

      (questionList[row][col] as SelectionQue)['options'].map((opt) => {
        addContentMutate(opt.content);
      });
      setIsLinearChange(false);
    }
  }, [onChangeLinear, optDataTemp, onDelete, isLinearChange]);

  useEffect(() => {
    if (type === SELECTION_DROPDOWN && options[options.length - 1].content === '기타') {
      const temp = JSON.parse(JSON.stringify(questionList));
      (temp[row][col] as SelectionQue).options.pop();
      setQuestionList(temp);
    }
  }, [questionList]);

  if (type === SELECTION_LINEAR) {
    // console.log('linear', +data.options[0].content);
    // console.log(queTypes.Selection.includes(data.type), data.type, data.options);

    return (
      <DropDownWrapper>
        {contextHolder}

        <Select
          defaultValue={`${pathname.slice(1, 16) !== 'mypage/editform' ? 0 : data?.options[0]?.content || 0}`}
          onChange={(e) => onChangeLinear(e, 0)}
          style={{ width: 70 }}
          options={linearList(0, 1)}
        />
        <span>~</span>
        <Select
          defaultValue={`${
            pathname.slice(1, 16) !== 'mypage/editform' ? 10 : data?.options[data.options.length - 1]?.content || 10
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
