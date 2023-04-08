import React, { ReactNode } from 'react';
import { BtnWrapper } from './styles';

export interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  color: string;
  bgColor: string;
  fontSize: number;
  width: number;
  height: number;
  children: ReactNode;
}

export default function Button({ onClick, type, color, fontSize, bgColor, width, height, children }: ButtonProps) {
  return (
    <BtnWrapper
      type={type || 'button'}
      onClick={onClick}
      color={color}
      fontSize={fontSize}
      height={height}
      bgColor={bgColor}
      width={width}
    >
      <span>{children}</span>
    </BtnWrapper>
  );
}
