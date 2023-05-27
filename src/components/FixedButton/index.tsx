import { useCallback, useEffect, useState } from 'react';
import { ButtonOpen, CloseBtn, FloatButton, FunctionBtn } from './styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { gptOpen } from '../../recoil/Gpt/atom';
import GPTSocket from '../GPT/GPTSocket';

export default function FixedButton() {
  const [buttonOpen, setButtonOpen] = useState(false);
  const [isOpen, setIsOpen] = useRecoilState(gptOpen);

  const showModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const openFloat = useCallback(() => {
    setButtonOpen(true);
  }, []);

  const closeFloat = useCallback(() => {
    setButtonOpen(false);
  }, []);

  const navigate = useNavigate();

  const location = useLocation();
  const [render, setRender] = useState(false);

  const excludedPaths = ['makeform', 'resform', 'signin', 'signup'];

  useEffect(() => {
    const isExcludedPath = excludedPaths.some((path) => location.pathname.includes(path));
    // const isRootPath = location.pathname === '/';

    if (isExcludedPath) {
      setRender(false);
      return;
    } else {
      setRender(true);
    }
  }, [location.pathname]);

  return (
    <>
      {render && (
        <>
          {!buttonOpen && (
            <FloatButton onClick={openFloat}>
              <img src="/images/gak.png" alt="gak" />
              <span>GAK</span>
            </FloatButton>
          )}

          {buttonOpen && (
            <ButtonOpen>
              <CloseBtn onClick={closeFloat}>
                <img src="/images/closeFloatBtn.png" alt="close" />
              </CloseBtn>
              <FunctionBtn
                onClick={() => {
                  navigate('/makeform');
                  closeFloat();
                }}
              >
                <img src="/images/makeFloatBtn.png" alt="makeform" />
                <span>생성하기</span>
              </FunctionBtn>
              <FunctionBtn
                onClick={() => {
                  navigate('/resform');
                  closeFloat();
                }}
              >
                <img src="/images/resFloatBtn.png" alt="resform" />
                <span>응답하기</span>
              </FunctionBtn>

              <FunctionBtn
                onClick={() => {
                  showModal();
                  closeFloat();
                }}
              >
                <img src="/images/gptFloatBtn.png" alt="gpt" />
                <span>GPT</span>
              </FunctionBtn>
            </ButtonOpen>
          )}
          {isOpen && <GPTSocket />}
        </>
      )}
    </>
  );
}
