import React from 'react';
import { ResModalTitle } from '../../ResForm/ResFormModal/styles';
import { MakeFormModalWrapper } from './styles';

interface Props {
  open: boolean;
  onCancel: () => void;
}

export default function MakeFromModal({ open, onCancel }: Props) {
  return (
    <MakeFormModalWrapper
      title={<ResModalTitle>질문 세부 설명</ResModalTitle>}
      width={1000}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      123
    </MakeFormModalWrapper>
  );
}
