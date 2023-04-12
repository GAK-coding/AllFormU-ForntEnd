import React, { useState } from 'react';
import BaseBgBox from '../../components/ui/BaseBgBox';
import ResFormModal from '../../components/ResFormModal';

export default function ResForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <BaseBgBox>
      <button onClick={showModal}>모달 버튼</button>
      {isModalOpen && <ResFormModal open={isModalOpen} onCancel={handleCancel} />}
    </BaseBgBox>
  );
}
