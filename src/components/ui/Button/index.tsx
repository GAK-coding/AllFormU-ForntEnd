import React from 'react';
import { BtnWrapper } from './styles';

export interface ButtonProps {
  color: string;
  bgColor: string;
  fontSize: number;
  width: number;
  height: number;
  text: string;
}

export default function Button({ color, fontSize, bgColor, width, height, text }: ButtonProps) {
  return (
    <BtnWrapper color={color} fontSize={fontSize} height={height} bgColor={bgColor} width={width}>
      {text}
    </BtnWrapper>
  );
}
