import React from 'react';
import { Explanation, ExplanationAbove, ExplanationBelow, ExplanationMiddle, HomeWrapper, Img } from './styles';
import Button from '../../components/ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';

export default function Home() {
  const { main } = useRecoilValue(color);

  return (
    <HomeWrapper>
      <Explanation>
        <div>
          <ExplanationAbove>
            <span>Gak과 함께,</span>
            <br /> 손쉽게 만드는 설문 플랫폼
          </ExplanationAbove>
          <ExplanationMiddle>All Form Ü</ExplanationMiddle>
          <ExplanationBelow>
            <Button
              text={`나만의 설문 만들기 ->`}
              fontSize={1.4}
              bgColor={main}
              width={20}
              height={5}
              color={'white'}
            />
          </ExplanationBelow>
        </div>
      </Explanation>
      <Img>
        <img src="logo.png" alt="logo" />
      </Img>
    </HomeWrapper>
  );
}
