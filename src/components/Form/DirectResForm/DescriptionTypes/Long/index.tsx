import React from 'react';
import TextArea from 'antd/es/input/TextArea';
import { LongWrapper } from './styles';

interface Props {
  id: number;
}

export default function Long({ id }: Props) {
  return (
    <LongWrapper>
      <TextArea
        showCount
        maxLength={100}
        style={{ height: 80, resize: 'none' }}
        value={''}
        onChange={() => true}
        placeholder="내 답변"
        required
      />
    </LongWrapper>
  );
}
