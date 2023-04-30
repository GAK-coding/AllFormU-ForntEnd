import React from 'react';
import { FormInputWrapper } from './styles';

interface Props {
  width?: string;
  fontSize: number;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({ value, onChange, width = '50%', fontSize, placeholder }: Props) {
  return (
    <FormInputWrapper value={value} onChange={onChange} width={width} fontSize={fontSize} placeholder={placeholder} />
  );
}
