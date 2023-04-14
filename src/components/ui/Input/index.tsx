import React, { ChangeEvent } from 'react';
import { BaseInput } from './styles';

export interface Input {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  width?: number;
  height?: number;
  type?: string;
}

export default function Input({ value, onChange, onKeyDown, placeholder, width, height, type }: Input) {
  return (
    <BaseInput
      type={type ? type : 'text'}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      width={width}
      height={height}
      required
    />
  );
}
