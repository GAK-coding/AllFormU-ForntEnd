import React from 'react';
import TextArea from 'antd/es/input/TextArea';
import { LongWrapper } from './styles';

export default function Long() {
  return (
    <LongWrapper>
      <TextArea
        showCount
        maxLength={100}
        style={{ height: 80, resize: 'none' }}
        value={''}
        onChange={() => true}
        placeholder="설문 설명"
        required
      />
    </LongWrapper>
  );
}
