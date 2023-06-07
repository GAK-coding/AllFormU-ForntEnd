import React, { useCallback, useEffect, useState } from 'react';
import { CheckBoxWrapper, CustomCheckBoxGroup } from './styles';
import { SelectionQue } from '../../../../../typings/makeForm';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useRecoilState } from 'recoil';
import { checkSelection, resSelectionSets } from '../../../../../recoil/Resform/atom';
import { ResSelection, ResSelections } from '../../../../../typings/resForm';

interface Props {
  data: SelectionQue;
  id: number;
}

export default function CheckBox({ data, id }: Props) {
  const plainOptions = data.options.map((option) => option.content);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [checkNum, setCheckNum] = useState<number[]>([]);
  const [chkSelection, setChkSelection] = useRecoilState(checkSelection);

  const onChange = useCallback((list: CheckboxValueType[]) => {
    setCheckedList(list);
  }, []);

  useEffect(() => {
    const nums: number[] = [];
    checkedList.map((item) => nums.push(plainOptions.indexOf(item.toString())));

    setCheckNum(nums);
  }, [checkedList]);

  useEffect(() => {
    const data: ResSelection[] = [];
    const tempSelection: ResSelections = JSON.parse(JSON.stringify(chkSelection));

    if (checkNum.length === 0) {
      (tempSelection[id] as ResSelection) = { questionId: id, num: -1 };

      setChkSelection(tempSelection);
      return;
    }

    checkNum.map((num) => data.push({ questionId: id, num }));

    tempSelection[id] = data;
    setChkSelection(tempSelection);
  }, [checkNum]);

  return (
    <CheckBoxWrapper>
      <CustomCheckBoxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    </CheckBoxWrapper>
  );
}
