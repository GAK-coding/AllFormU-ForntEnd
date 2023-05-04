import React from 'react';
import { Description } from './styles';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';
import { BsImage } from 'react-icons/bs';

interface Props {
  type: string;
}

const text: { [key: string]: React.ReactNode } = {
  Description_short: <span>단답형 텍스트</span>,
  Description_long: <span>장문형 텍스트</span>,
  Description_date: (
    <span>
      <span>날짜</span>
      <AiTwotoneCalendar />
    </span>
  ),
  Description_time: (
    <span>
      <span>시간</span>
      <BiTime />
    </span>
  ),
  Description_image: (
    <span>
      <span>이미지</span>
      <BsImage />
    </span>
  ),
};

export default function DescriptionBox({ type }: Props) {
  return <Description type={type}>{text[type]}</Description>;
}
