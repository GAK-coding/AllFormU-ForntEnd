import React, { useCallback, useRef, useState } from 'react';
import { SelectionQue } from '../../../../../typings/makeForm';
import { DropDownWrapper } from './styles';
import { Select } from 'antd';
import { TbTriangleInverted } from 'react-icons/tb';

interface Props {
  data: SelectionQue;
  id: number;
}

export default function DropDown({ data, id }: Props) {
  const plainOptions = data.options.map((option) => {
    return { value: option.content, label: option.content };
  });
  const [value, setValue] = useState(plainOptions[0].value);
  const ref = useRef<number | null>(null);

  const handleChange = useCallback((value: string) => {
    setValue(value);
    ref.current = plainOptions.map((opt, idx) => {
      if (opt.value === value) return idx;
    });
  }, []);

  return (
    <DropDownWrapper>
      <Select
        className="custom-select"
        value={value}
        style={{ width: 135 }}
        onChange={handleChange}
        options={plainOptions}
        suffixIcon={<TbTriangleInverted />}
      />
    </DropDownWrapper>
  );
}
