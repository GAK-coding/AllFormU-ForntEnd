import React from 'react';
import { BtnBox, HeaderWrapper, Title } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';

export default function Header() {
  const navigate = useNavigate();
  const { main } = useRecoilValue(color);

  return (
    <HeaderWrapper>
      <Title>
        <Link to={'/'}>
          <div>
            <img src="headerLogo.png" alt="headerLogo"></img>
          </div>
        </Link>
      </Title>
      <BtnBox>
        <Button onClick={() => navigate('/mypage')} fontSize={1.4} bgColor={main} width={13} height={4} color={'white'}>
          My page
        </Button>
        <Button fontSize={1.4} bgColor={main} width={13} height={4} color={'white'}>
          Guide
        </Button>
        <Button onClick={() => navigate('/signup')} fontSize={1.4} bgColor={main} width={13} height={4} color={'white'}>
          Sign in
        </Button>
      </BtnBox>
    </HeaderWrapper>
  );
}
