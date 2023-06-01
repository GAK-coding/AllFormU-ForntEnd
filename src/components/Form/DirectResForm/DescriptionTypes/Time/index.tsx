import React from 'react';
import { TimeWrapper } from './styles';
import { TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';

interface Props {
  id: number;
}

export default function Time({ id }: Props) {
  const onChange = (time: Dayjs | null, timeString: string) => {
    console.log(time, timeString);
  };

  return (
    <TimeWrapper>
      <TimePicker use12Hours format="h:mm a" onChange={onChange} />
    </TimeWrapper>
  );
}
