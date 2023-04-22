import React, { ReactNode } from 'react';
import { BaseGbBoxWrapper } from './styles';

interface Props {
  children: ReactNode;
}

export default function BaseBgBox({ children }: Props) {
  return (
    <BaseGbBoxWrapper>
      <div>{children}</div>
    </BaseGbBoxWrapper>
  );
}
