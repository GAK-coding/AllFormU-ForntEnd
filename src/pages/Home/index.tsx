import React, { useCallback } from 'react';
import { Arrow, Explanation, ExplanationAbove, ExplanationBelow, ExplanationMiddle, HomeWrapper, Img } from './styles';
import Button from '../../components/ui/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { BiRightArrowAlt } from 'react-icons/bi';
import { googleUserInfo, isLogin, userInfo, userPersist } from '../../recoil/User/atom';

export default function Home() {
  const { purple } = useRecoilValue(color);
  const navigate = useNavigate();
  // const info = useRecoilValue(userInfo);
  // const [login, setLogin] = useRecoilState(isLogin);
  const googleInfo = useRecoilValue(googleUserInfo);
  const [user, setUser] = useRecoilState(userPersist);

  const checkUser = useCallback(() => {
    if (user.length === 0) {
      navigate('/signin');
    } else {
      navigate('/makeform');
    }
  }, []);

  return (
    <HomeWrapper>
      <Explanation>
        <div>
          <ExplanationAbove>
            <div />
            <div>
              <span>Gak</span> 과 함께
              <br />
              너를 위해서, 너만을 위해서
            </div>
            <div />
          </ExplanationAbove>
          <ExplanationMiddle>
            <div />
            <div>
              <img src="/images/homeLogo.png" alt="homeLogo" />
            </div>
            <div />
          </ExplanationMiddle>
          <ExplanationBelow>
            <Button onClick={checkUser} fontSize={1.8} bgColor={purple} width={26} height={5} color={'white'}>
              나만의 설문 만들기 &nbsp;&nbsp;&nbsp;
              <Arrow>
                <BiRightArrowAlt />
              </Arrow>
            </Button>
          </ExplanationBelow>
        </div>
      </Explanation>
      <Img>
        <img src="/images/logo.png" alt="logo" />
      </Img>
    </HomeWrapper>
  );
}
