import React from 'react';
import { BaseQuestionWrapper } from '../BaseQuestion/styles';
import { ShortQuestionWrapper } from './styles';

interface Props {
  data: any;
}

export default function ShortQuestion({ data }: Props) {
  return (
    <BaseQuestionWrapper>
      <ShortQuestionWrapper>
        <div>{data.title}</div>
      </ShortQuestionWrapper>
    </BaseQuestionWrapper>
  );
}
