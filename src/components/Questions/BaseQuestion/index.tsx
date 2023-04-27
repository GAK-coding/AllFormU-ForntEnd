import React from 'react';
import { BaseQuestionWrapper } from './styles';

interface Props {
  children: React.ReactNode;
}

export default function BaseQuestion({ children }: Props) {
  return <BaseQuestionWrapper>{children}</BaseQuestionWrapper>;
}
