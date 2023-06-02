import React, { useEffect, useState } from 'react';
import { DateWrapper } from './styles';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import { useRecoilState } from 'recoil';
import { resDescriptionSets } from '../../../../../recoil/Resform/atom';
import { ResDescription } from '../../../../../typings/resForm';

interface Props {
  id: number;
}

export default function Date({ id }: Props) {
  const [resData, setResData] = useRecoilState(resDescriptionSets);
  const [idx, setIdx] = useState(-1);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (date) {
      const temp = JSON.parse(JSON.stringify(resData));
      (temp[idx] as ResDescription).content = date.format('YYYY-MM-DD');
      setResData(temp);
    }
  };

  useEffect(() => {
    resData.find((que, index) => {
      if ('question_id' in que && que.question_id === id) setIdx(index);
    });
  }, [resData, idx]);

  return (
    <DateWrapper>
      <DatePicker picker={'date'} onChange={onChange} />
    </DateWrapper>
  );
}
