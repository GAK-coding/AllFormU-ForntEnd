import React from 'react';
import { FormInputWrapper } from './styles';

interface Props {
  width?: string;
  fontSize: number;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function FormInput({ value, onChange, width = '50%', fontSize, placeholder, disabled }: Props) {
  return (
    <FormInputWrapper
      value={value}
      onChange={onChange}
      width={width}
      fontSize={fontSize}
      disabled={disabled}
      placeholder={placeholder}
      required
    />
  );
}
