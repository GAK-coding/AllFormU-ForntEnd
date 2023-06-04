import React, { useCallback, useEffect, useState } from 'react';
import { CheckBoxWrapper, CustomCheckBoxGroup } from './styles';
import { SelectionQue } from '../../../../../typings/makeForm';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useRecoilState } from 'recoil';
import { resSelectionSets } from '../../../../../recoil/Resform/atom';
import { ResSelection } from '../../../../../typings/resForm';

interface Props {
  data: SelectionQue;
  id: number;
}

export default function CheckBox({ data, id }: Props) {
  const plainOptions = data.options.map((option) => option.content);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [checkNum, setCheckNum] = useState<number[]>([]);
  const [resData, setResData] = useRecoilState(resSelectionSets);

  const onChange = useCallback((list: CheckboxValueType[]) => {
    setCheckedList(list);
  }, []);

  useEffect(() => {
    const nums: number[] = [];
    checkedList.map((item) => nums.push(plainOptions.indexOf(item.toString())));

    setCheckNum(nums);
  }, [checkedList]);

  useEffect(() => {
    const temp = JSON.parse(JSON.stringify(resData));
    const resDataKeys = Object.keys(resData);
    const data: ResSelection[] = [];

    if (checkNum.length === 0) {
      delete temp[id];
      setResData(temp);
      return;
    }

    checkNum.map((num) => data.push({ questionId: id, num }));

    if (!resDataKeys.includes(id.toString())) {
      temp[id] = data;
      setResData(temp);
    } else {
      setResData({
        ...temp,
        [id]: data,
      });
    }
  }, [checkNum]);

  return (
    <CheckBoxWrapper>
      <CustomCheckBoxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    </CheckBoxWrapper>
  );
}
