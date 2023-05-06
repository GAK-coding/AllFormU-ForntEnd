import React from 'react';
import { GridQue } from '../../../../typings/makeForm';
import { GridBoxWrapper } from './styles';

interface Props {
  data: GridQue;
  row: number;
  col: number;
}

export default function GridBox({ data, row, col }: Props) {
  const { rows, cols } = data;

  return (
    <GridBoxWrapper rowLen={rows.length + 1} colLen={cols.length + 1}>
      <div></div>
    </GridBoxWrapper>
  );
}
