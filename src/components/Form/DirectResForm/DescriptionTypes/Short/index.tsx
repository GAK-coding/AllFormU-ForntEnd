import React from 'react';
import FormInput from '../../../../ui/FormInput';

interface Props {
  id: number;
}

export default function Short({ id }: Props) {
  return (
    <FormInput value={''} onChange={() => true} width={'50%'} fontSize={1.6} disabled={false} placeholder={'내 답변'} />
  );
}
