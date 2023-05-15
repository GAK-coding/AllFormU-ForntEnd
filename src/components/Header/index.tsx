import React, { useCallback } from 'react';
import { BtnBox, HeaderWrapper, Title } from './styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { userInfo } from '../../recoil/User/atom';

export default function Header() {
  const navigate = useNavigate();
  const { purple } = useRecoilValue(color);

  const { pathname } = useLocation();
  const info = useRecoilValue(userInfo);
  const setOutUser = useSetRecoilState(userInfo);

  const checkLogout = useCallback(() => {
    if (info.id !== -1) {
      setOutUser({ id: -1, nickname: '', email: '', password: '' });
      navigate('/');
      alert('로그아웃 되었습니다.');
    } else {
      navigate('/signin');
    }
  }, [info.id]);

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
        {info.id !== -1 && (
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
        )}

        <Button onClick={checkLogout} fontSize={1.4} bgColor={purple} width={11} height={4} color={'white'}>
          {info.id === -1 ? 'Login' : 'Logout'}
        </Button>
      </BtnBox>
    </HeaderWrapper>
  );
}
