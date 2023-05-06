import React from 'react';
import { Description } from './styles';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';
import { BsImage } from 'react-icons/bs';
import {
  DESCRIPTION_DATE,
  DESCRIPTION_IMG,
  DESCRIPTION_LONG,
  DESCRIPTION_SHORT,
  DESCRIPTION_TIME,
} from '../../../../typings/makeForm';

interface Props {
  type: string;
}

const text: { [key: string]: React.ReactNode } = {
  [DESCRIPTION_SHORT]: <span>단답형 텍스트</span>,
  [DESCRIPTION_LONG]: <span>장문형 텍스트</span>,
  [DESCRIPTION_DATE]: (
    <span>
      <span>날짜</span>
      <AiTwotoneCalendar />
    </span>
  ),
  [DESCRIPTION_TIME]: (
    <span>
      <span>시간</span>
      <BiTime />
    </span>
  ),
  [DESCRIPTION_IMG]: (
    <span>
      <span>이미지</span>
      <BsImage />
    </span>
  ),
};

export default function DescriptionBox({ type }: Props) {
  return <Description type={type}>{text[type]}</Description>;
}
