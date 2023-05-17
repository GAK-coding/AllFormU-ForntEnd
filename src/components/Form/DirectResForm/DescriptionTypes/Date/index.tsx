import React from 'react';
import { DateWrapper } from './styles';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';

export default function Date() {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <DateWrapper>
      <DatePicker picker={'date'} onChange={onChange} />
    </DateWrapper>
  );
}
