import React from 'react';
import { OptionWrapper, Radios } from './styles';
import { SelectionQue } from '../../../../../typings/makeForm';
import { Radio } from 'antd';

interface Props {
  data: SelectionQue;
}

export default function Option({ data }: Props) {
  return (
    <OptionWrapper>
      <Radio.Group name="radiogroup">
        <Radios>
          {data.options.map((option) => (
            <Radio key={option.id} value={option.id}>
              {option.content}
            </Radio>
          ))}
        </Radios>
      </Radio.Group>
    </OptionWrapper>
  );
}
