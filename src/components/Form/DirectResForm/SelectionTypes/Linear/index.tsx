import React from 'react';
import { LinearWrapper } from './styles';
import { Radios } from '../Option/styles';
import { Radio } from 'antd';
import { SelectionQue } from '../../../../../typings/makeForm';

interface Props {
  data: SelectionQue;
}

export default function Linear({ data }: Props) {
  return (
    <LinearWrapper>
      <Radio.Group name="radiogroup">
        {data.options.map((option) => (
          <Radio key={option.id} value={option.id}>
            {option.content}
          </Radio>
        ))}
      </Radio.Group>
    </LinearWrapper>
  );
}
