import React from 'react';
import { BtnBox, HeaderWrapper, Title } from './styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';

export default function Header() {
  const navigate = useNavigate();
  const { purple } = useRecoilValue(color);

  const { pathname } = useLocation();

  return (
    <HeaderWrapper>
      <Title>
        {pathname !== '/' && (
          <Link to={'/'}>
            <div>
              <img src="/images/headerLogo.png" alt="headerLogo" />
            </div>
          </Link>
        )}
      </Title>
      <BtnBox>
        <Button
          onClick={() => navigate('/resform')}
          fontSize={1.4}
          bgColor={purple}
          width={11}
          height={4}
          color={'white'}
        >
          ResForm
        </Button>
        <Button
          onClick={() => navigate('/mypage')}
          fontSize={1.4}
          bgColor={purple}
          width={11}
          height={4}
          color={'white'}
        >
          My page
        </Button>
        <Button fontSize={1.4} bgColor={purple} width={11} height={4} color={'white'}>
          Guide
        </Button>
        <Button
          onClick={() => navigate('/signin')}
          fontSize={1.4}
          bgColor={purple}
          width={11}
          height={4}
          color={'white'}
        >
          Sign in
        </Button>
      </BtnBox>
    </HeaderWrapper>
  );
}
