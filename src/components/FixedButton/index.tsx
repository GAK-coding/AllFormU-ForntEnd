import { useState } from 'react';
import { ButtonOpen, CloseBtn, FloatButton, FunctionBtn } from './styles';
import { useNavigate } from 'react-router-dom';
import ConnectGPT from '../ConnectGPT';

export default function FixedButton() {
  const [buttonOpen, setButtonOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {!buttonOpen && (
        <FloatButton
          onClick={() => {
            setButtonOpen(true);
          }}
        >
          <img src="/images/gak.png" alt="gak" />
          <span>GAK</span>
        </FloatButton>
      )}

      {buttonOpen && (
        <ButtonOpen>
          <CloseBtn
            onClick={() => {
              setButtonOpen(false);
            }}
          >
            <img src="/images/closeFloatBtn.png" alt="close" />
          </CloseBtn>
          <FunctionBtn
            onClick={() => {
              navigate('/makeform');
              setButtonOpen(false);
            }}
          >
            <img src="/images/makeFloatBtn.png" alt="makeform" />
            <span>생성하기</span>
          </FunctionBtn>
          <FunctionBtn
            onClick={() => {
              navigate('/resform');
              setButtonOpen(false);
            }}
          >
            <img src="/images/resFloatBtn.png" alt="resform" />
            <span>응답하기</span>
          </FunctionBtn>
          <FunctionBtn
            onClick={() => {
              navigate('/gpt');
              setButtonOpen(false);
            }}
          >
            <img src="/images/gptFloatBtn.png" alt="gpt" />
            <span>GPT</span>
          </FunctionBtn>
        </ButtonOpen>
      )}
    </>
  );
}
