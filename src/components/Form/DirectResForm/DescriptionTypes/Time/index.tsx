import React from 'react';
import { TimeWrapper } from './styles';
import { TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';

export default function Time() {
  const onChange = (time: Dayjs | null, timeString: string) => {
    console.log(time, timeString);
  };

  return (
    <TimeWrapper>
      <TimePicker use12Hours format="h:mm a" onChange={onChange} />
    </TimeWrapper>
  );
}
