import React, { useCallback } from 'react';
import { BtnBox, HeaderWrapper, Title } from './styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { googleUserInfo, isLogin, userInfo, userPersist } from '../../recoil/User/atom';
import { useMessage } from '../../hooks/useMessage';

export default function Header() {
  const navigate = useNavigate();
  const { purple } = useRecoilValue(color);
  const [login, setLogin] = useRecoilState(isLogin);

  const { pathname } = useLocation();
  // const [info, setInfo] = useRecoilState(userInfo);
  const [googleInfo, setGoogleInfo] = useRecoilState(googleUserInfo);
  const [user, setUser] = useRecoilState(userPersist);
  const { showMessage, contextHolder } = useMessage();

  const checkLogout = useCallback(() => {
    if (user.length !== 0) {
      setUser([]);
      setLogin(false);
      localStorage.removeItem('accessToken');
      navigate('/');
      showMessage('success', '로그아웃 되었습니다.');
    } else {
      navigate('/signin');
    }
  }, [user, login]);

  return (
    <HeaderWrapper>
      {contextHolder}
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
        {login && (
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
          {user.length === 0 ? 'Login' : 'Logout'}
        </Button>
      </BtnBox>
    </HeaderWrapper>
  );
}
