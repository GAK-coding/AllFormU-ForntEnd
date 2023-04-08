import React from 'react';
import { Explanation, ExplanationAbove, ExplanationBelow, ExplanationMiddle, HomeWrapper, Img } from './styles';
import Button from '../../components/ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { AiOutlineArrowRight } from 'react-icons/ai';

export default function Home() {
  const { main } = useRecoilValue(color);

  return (
    <HomeWrapper>
      <Explanation>
        <div>
          <ExplanationAbove>
            <span>Gak과 함께,</span>
            <br /> 너를 위해서, 너만을 위해서
          </ExplanationAbove>
          <ExplanationMiddle>All Form Ü</ExplanationMiddle>
          <ExplanationBelow>
            <Button fontSize={1.4} bgColor={main} width={20} height={5} color={'white'}>
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
