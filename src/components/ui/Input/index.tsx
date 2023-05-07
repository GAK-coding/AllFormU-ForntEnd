import React, { ChangeEvent } from 'react';
import { BaseInput } from './styles';

export interface Input {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  width?: number | string;
  height?: number | string;
  type?: string;
  size?: number;
}

export default function Input({ size, value, onChange, onKeyDown, placeholder, width, height, type }: Input) {
  return (
    <BaseInput
      type={type ? type : 'text'}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      width={width}
      height={height}
      size={size}
      required
    />
  );
}
