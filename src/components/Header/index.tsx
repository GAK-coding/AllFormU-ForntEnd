import React from 'react';
import { BtnBox, HeaderWrapper, Title } from './styles';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';

export default function Header() {
  const { main } = useRecoilValue(color);

  return (
    <HeaderWrapper>
      <Title>
        <Link to={'/'}>All Form ü</Link>
      </Title>
      <BtnBox>
        <Button text={'My page'} fontSize={1.4} bgColor={main} width={13} height={4} color={'white'} />
        <Button text={'Guide'} fontSize={1.4} bgColor={main} width={13} height={4} color={'white'} />
        <Button text={'Sign in'} fontSize={1.4} bgColor={main} width={13} height={4} color={'white'} />
      </BtnBox>
    </HeaderWrapper>
  );
}
