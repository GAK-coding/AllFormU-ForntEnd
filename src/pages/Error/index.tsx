import React from 'react';
import { ErrorWrapper } from './styles';

export default function Error() {
  return (
    <ErrorWrapper>
      <img src={'/images/error.png'} alt="" />
      <span>존재하지 않는 페이지입니다.</span>
    </ErrorWrapper>
  );
}
