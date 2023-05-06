import React, { ChangeEvent, useCallback, useState } from 'react';
import BaseBgBox from '../../components/ui/BaseBgBox';
import { FindLine, Form, LoginBtn, LoginLine, PageInfo } from '../SignUp/styles';
import Input from '../../components/ui/Input';
import { signInInfo } from '../../typings/user';
import Button from '../../components/ui/Button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { signIn } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../recoil/User/atom';
import GoogleAuth from '../../components/GoogleLogin/GoogleAuth';

export default function SignIn() {
  const { blue } = useRecoilValue(color);
  const setUserInfo = useSetRecoilState(userInfo);
  const serInfo = useRecoilValue(userInfo);
  const [info, setInfo] = useState<signInInfo>({
    email: '',
    password: '',
  });
  const { email, password } = info;
  const navigate = useNavigate();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof signInInfo) => {
      const temp = { ...info };
      temp[value] = e.target.value;
      setInfo(temp);
    },
    [info]
  );

  const onClick = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      signIn({ email })
        .then((res) => {
          console.log(res.data);

          if (res.data[0]) {
            setUserInfo(res.data[0]);
            alert('로그인 성공!');
          } else alert('로그인 실패');
        })
        .catch((err) => {
          console.log(err);
          alert('다시 시도해주세요.');
        });
    },
    [email]
  );

  return (
    <BaseBgBox>
      <PageInfo>
        <div>Sign In</div>
        <div>
          <img src="/images/logo.png" alt="logo" />
          <span>All Form U</span>
        </div>
      </PageInfo>
      <Form onSubmit={onClick}>
        <LoginLine>
          <span>Email</span>

          <Input
            type={'email'}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'email')}
            placeholder={'이메일'}
            width={30}
            height={2}
            size={1.5}
          />
        </LoginLine>
        <LoginLine>
          <span>Password</span>

          <Input
            type={'password'}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'password')}
            placeholder={'비밀번호'}
            width={30}
            height={2}
            size={1.5}
          />
        </LoginLine>
        <LoginLine>
          <div onClick={() => navigate('/signin/findpassword')}>비밀번호 찾기</div>
        </LoginLine>
        <LoginBtn>
          <Button type={'submit'} color={'black'} bgColor={blue} fontSize={1.5} width={11} height={4}>
            로그인
          </Button>

          <GoogleAuth clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`} />

          <Button
            onClick={() => navigate('/signup')}
            type={'button'}
            color={'black'}
            bgColor={blue}
            fontSize={1.5}
            width={15}
            height={4}
          >
            회원가입
          </Button>
        </LoginBtn>
      </Form>
    </BaseBgBox>
  );
}
