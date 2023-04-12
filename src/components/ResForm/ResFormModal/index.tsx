import React from 'react';
import { ResModal, ResModalTitle } from './styles';

interface Props {
  open: boolean;
  onCancel: () => void;
}

const dummyData = {};

export default function ResFormModal({ open, onCancel }: Props) {
  return (
    <ResModal
      title={<ResModalTitle>질문 세부 설명</ResModalTitle>}
      width={800}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <p>chat gpt</p>
      <p>chat gpt</p>
      <p>chat gpt</p>
      <p>chat gpt</p>
      <p>chat gpt</p>
    </ResModal>
  );
}
