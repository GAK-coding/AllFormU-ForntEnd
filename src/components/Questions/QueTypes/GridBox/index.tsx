import React from 'react';
import { GridQue } from '../../../../typings/makeForm';
import { GridBoxWrapper } from './styles';

interface Props {
  data: GridQue;
  index: number;
}

export default function GridBox({ data, index }: Props) {
  const { rows, cols } = data;

  return (
    <GridBoxWrapper rowLen={rows.length + 1} colLen={cols.length + 1}>
      <div></div>
    </GridBoxWrapper>
  );
}
