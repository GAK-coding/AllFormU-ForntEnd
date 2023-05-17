import React from 'react';
import { QueWrapper } from '../../Questions/MakeQueBase/styles';
import {
  DESCRIPTION_DATE,
  DESCRIPTION_IMG,
  DESCRIPTION_LONG,
  DESCRIPTION_SHORT,
  DESCRIPTION_TIME,
  DescriptionQue,
  GridQue,
  SelectionQue,
} from '../../../../typings/makeForm';
import { DescriptionResWrapper } from './styles';
import QueTitle from '../QueTitle';
import Short from '../DescriptionTypes/Short';
import Long from '../DescriptionTypes/Long';
import Date from '../DescriptionTypes/Date';
import Time from '../DescriptionTypes/Time';
import Image from '../DescriptionTypes/Image';

interface Props {
  data: DescriptionQue;
  row: number;
  col: number;
  isClick: boolean;
  onClickQue: (row: number, col: number) => void;
}

export default function DescriptionRes({ data, row, col, isClick, onClickQue }: Props) {
  return (
    <QueWrapper>
      <DescriptionResWrapper>
        <QueTitle data={data} />
        {data.type === DESCRIPTION_SHORT && <Short />}
        {data.type === DESCRIPTION_LONG && <Long />}
        {data.type === DESCRIPTION_DATE && <Date />}
        {data.type === DESCRIPTION_TIME && <Time />}
        {data.type === DESCRIPTION_IMG && <Image />}
      </DescriptionResWrapper>
    </QueWrapper>
  );
}
