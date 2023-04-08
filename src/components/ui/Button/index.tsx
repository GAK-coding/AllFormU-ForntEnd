import React, { ReactNode } from 'react';
import { BtnWrapper } from './styles';

export interface ButtonProps {
  onClick?: () => void;
  color: string;
  bgColor: string;
  fontSize: number;
  width: number;
  height: number;
  children: ReactNode;
}

export default function Button({ onClick, color, fontSize, bgColor, width, height, children }: ButtonProps) {
  return (
    <BtnWrapper onClick={onClick} color={color} fontSize={fontSize} height={height} bgColor={bgColor} width={width}>
      <span>{children}</span>
    </BtnWrapper>
  );
}
