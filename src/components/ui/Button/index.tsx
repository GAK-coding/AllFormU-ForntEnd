import React from 'react';
import { BtnWrapper } from './styles';

export interface ButtonProps {
  onClick?: () => void;
  color: string;
  bgColor: string;
  fontSize: number;
  width: number;
  height: number;
  text: string;
}

export default function Button({ onClick, color, fontSize, bgColor, width, height, text }: ButtonProps) {
  return (
    <BtnWrapper onClick={onClick} color={color} fontSize={fontSize} height={height} bgColor={bgColor} width={width}>
      {text}
    </BtnWrapper>
  );
}
