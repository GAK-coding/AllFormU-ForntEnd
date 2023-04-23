import React from 'react';
import { Explanation, ExplanationAbove, ExplanationBelow, ExplanationMiddle, HomeWrapper, Img } from './styles';
import Button from '../../components/ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { purple } = useRecoilValue(color);
  const navigate = useNavigate();

  return (
    <HomeWrapper>
      <Explanation>
        <div>
          <ExplanationAbove>
            <span>Gak과 함께,</span>
            <br />
            너를 위해서, 너만을 위해서
          </ExplanationAbove>
          <ExplanationMiddle>
            <img src="homeLogo.png" alt="homeLogo" />
          </ExplanationMiddle>
          <ExplanationBelow>
            <Button
              onClick={() => navigate('/makeform')}
              fontSize={1.8}
              bgColor={purple}
              width={24}
              height={6}
              color={'white'}
            >
              나만의 설문 만들기 &nbsp;&nbsp;&nbsp; <AiOutlineArrowRight />
            </Button>
          </ExplanationBelow>
        </div>
      </Explanation>
      <Img>
        <img src="logo.png" alt="logo" />
      </Img>
    </HomeWrapper>
  );
}
