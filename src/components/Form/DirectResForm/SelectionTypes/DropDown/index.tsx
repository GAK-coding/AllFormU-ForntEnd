import React, { useState } from 'react';
import { SelectionQue } from '../../../../../typings/makeForm';
import { DropDownWrapper } from './styles';
import { Select } from 'antd';
import { TbTriangleInverted } from 'react-icons/tb';

interface Props {
  data: SelectionQue;
}

export default function DropDown({ data }: Props) {
  const plainOptions = data.options.map((option) => {
    return { value: option.content, label: option.content };
  });
  const [value, setValue] = useState(plainOptions[0].value);

  const handleChange = (value: string) => {
    setValue(value);
  };

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
