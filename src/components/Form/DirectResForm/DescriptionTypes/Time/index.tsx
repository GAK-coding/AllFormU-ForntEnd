import React, { useEffect, useState } from 'react';
import { TimeWrapper } from './styles';
import { TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import { useRecoilState } from 'recoil';
import { resDescriptionSets } from '../../../../../recoil/Resform/atom';
import { ResDescription } from '../../../../../typings/resForm';

interface Props {
  id: number;
}

export default function Time({ id }: Props) {
  const [resData, setResData] = useRecoilState(resDescriptionSets);
  const [idx, setIdx] = useState(-1);

  const onChange = (time: Dayjs | null, timeString: string) => {
    const temp = JSON.parse(JSON.stringify(resData));

    if (!time) {
      (temp[idx] as ResDescription).content = null;
      setResData(temp);
      return;
    }

    (temp[idx] as ResDescription).content = timeString;
    setResData(temp);
  };

  useEffect(() => {
    resData.find((que, index) => {
      if ('question_id' in que && que.question_id === id) setIdx(index);
    });
  }, [resData, idx]);

  return (
    <TimeWrapper>
      <TimePicker use12Hours format="h:mm a" onChange={onChange} />
    </TimeWrapper>
  );
}
