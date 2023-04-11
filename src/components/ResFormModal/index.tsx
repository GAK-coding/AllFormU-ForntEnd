import React from 'react';
import { Modal } from 'antd';

interface Props {
  open: boolean;
}

export default function ResFormModal({ open }: Props) {
  return (
    <Modal title="대화형" open={open} footer={null}>
      <p>chat gpt</p>
    </Modal>
  );
}
