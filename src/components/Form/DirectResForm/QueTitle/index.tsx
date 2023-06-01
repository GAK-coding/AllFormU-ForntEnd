import React from 'react';
import { QueTitleWrapper } from './styles';
import { DescriptionQue, GridQue, SelectionQue } from '../../../../typings/makeForm';

interface Props {
  data: DescriptionQue | SelectionQue | GridQue;
}

export default function QueTitle({ data }: Props) {
  return (
    <QueTitleWrapper>
      {data.title}
      <span>{data.required && '*'}</span>
    </QueTitleWrapper>
  );
}
