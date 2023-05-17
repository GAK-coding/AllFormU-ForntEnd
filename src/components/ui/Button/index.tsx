import React, { ReactNode } from 'react';
import { BtnWrapper } from './styles';

export interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  color: string;
  bgColor: string;
  fontSize: number;
  width: number | string;
  height: number | string;
  children: ReactNode;
  radius?: number;
  border?: string;
}

export default function Button({
  radius,
  onClick,
  type,
  color,
  fontSize,
  bgColor,
  width,
  height,
  children,
  border,
}: ButtonProps) {
  return (
    <BtnWrapper
      type={type || 'button'}
      onClick={onClick}
      color={color}
      fontSize={fontSize}
      width={width}
      height={height}
      bgColor={bgColor}
      radius={radius}
      border={border}
    >
      <span>{children}</span>
    </BtnWrapper>
  );
}
