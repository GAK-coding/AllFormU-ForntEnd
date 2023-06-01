import React from 'react';
import { DateWrapper } from './styles';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';

interface Props {
  id: number;
}

export default function Date({ id }: Props) {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <DateWrapper>
      <DatePicker picker={'date'} onChange={onChange} />
    </DateWrapper>
  );
}
