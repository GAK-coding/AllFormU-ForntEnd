import React from 'react';
import FormInput from '../../../../ui/FormInput';

export default function Short() {
  return (
    <FormInput value={''} onChange={() => true} width={'50%'} fontSize={1.6} disabled={false} placeholder={'내 답변'} />
  );
}
