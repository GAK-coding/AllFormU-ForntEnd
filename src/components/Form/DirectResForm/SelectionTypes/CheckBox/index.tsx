import React, { useEffect, useState } from 'react';
import { CheckBoxWrapper, CustomCheckBoxGroup } from './styles';
import { SelectionQue } from '../../../../../typings/makeForm';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

interface Props {
  data: SelectionQue;
}

export default function CheckBox({ data }: Props) {
  const plainOptions = data.options.map((option) => option.content);

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  useEffect(() => {
    checkedList.map((item) => console.log('여기', plainOptions.indexOf(item.toString())));
  });

  console.log(checkedList);
  // plainOptions.indexOf(item)

  return (
    <CheckBoxWrapper>
      <CustomCheckBoxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    </CheckBoxWrapper>
  );
}
