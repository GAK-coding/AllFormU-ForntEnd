import React from 'react';
import { Modal } from 'antd';

interface Props {
  open: boolean;
  onCancel: () => void;
}

export default function ResFormModal({ open, onCancel }: Props) {
  return (
    <Modal title="대화형" width={800} open={open} onCancel={onCancel} footer={null}>
      <p>chat gpt</p>
    </Modal>
  );
}
