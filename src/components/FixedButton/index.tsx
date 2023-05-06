import { useState } from 'react';
import { CloseBtn, FloatButton, FunctionBtn, ModalOpen } from './styles';
import { useNavigate } from 'react-router-dom';

export default function FixedButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {!modalOpen && (
        <FloatButton
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <img src="/images/gak.png" alt="gak" />
          <span>GAK</span>
        </FloatButton>
      )}

      {modalOpen && (
        <ModalOpen>
          <CloseBtn
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <img src="/images/closeFloatBtn.png" alt="close" />
          </CloseBtn>
          <FunctionBtn
            onClick={() => {
              navigate('/makeform');
              setModalOpen(false);
            }}
          >
            <img src="/images/makeFloatBtn.png" alt="makeform" />
            <span>생성하기</span>
          </FunctionBtn>
          <FunctionBtn
            onClick={() => {
              navigate('/resform');
              setModalOpen(false);
            }}
          >
            <img src="/images/resFloatBtn.png" alt="resform" />
            <span>응답하기</span>
          </FunctionBtn>
          <FunctionBtn
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <img src="/images/gptFloatBtn.png" alt="gpt" />
            <span>GPT</span>
          </FunctionBtn>
        </ModalOpen>
      )}
    </>
  );
}
