import React, { ChangeEvent, useCallback, useEffect } from 'react';
import BaseBgBox from '../../components/ui/BaseBgBox';
import { Form, LoginBtn, LoginLine, LoginWrapper, PageInfo, Wrapper } from '../SignUp/styles';
import Input from '../../components/ui/Input';
import { signInInfo } from '../../typings/user';
import Button from '../../components/ui/Button';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { useNavigate } from 'react-router-dom';
import { userInfo, signInUserInfo } from '../../recoil/User/atom';
import GoogleAuth from '../../components/GoogleLogin/GoogleAuth';
import { useMutation } from 'react-query';
import { signIn } from '../../api/user';

export default function SignIn() {
  const { blue } = useRecoilValue(color);
  const [userInput, setUserInput] = useRecoilState(signInUserInfo);
  const { email, password } = useRecoilValue(signInUserInfo);
  const setUserInfo = useSetRecoilState(userInfo);
  const navigate = useNavigate();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof signInInfo) => {
      const temp = { ...userInput };
      temp[value] = e.target.value;

      setUserInput(temp);
    },
    [userInput]
  );

  const { mutate, data, isSuccess } = useMutation(signIn);

  useEffect(() => {
    if (isSuccess) {
      if (data.httpStatus === 'CONFLICT') {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      if (data.httpStatus === 'NOT_FOUND') {
        alert('존재하지 않는 이메일입니다.');
        return;
      }
      if (data.httpStatus === 'BAD_REQUEST') {
        alert('휴면 계정입니다. 재회원가입을 통해 휴면 상태를 해제해주세요.');
        return;
      } else {
        const infoList = { id: data.id, nickname: data.nickname, email: data.email, password: data.password };
        setUserInfo(infoList);
        navigate('/');
      }
    }
  }, [data, isSuccess]);

  const onClick = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      mutate({ email, password });
    },
    [email, password]
  );

  return (
    <Wrapper>
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
              width={'50%'}
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
              width={'50%'}
              height={2}
              size={1.5}
            />
          </LoginLine>

          <LoginLine>
            <div onClick={() => navigate('/signin/findpassword')}>비밀번호 찾기</div>
          </LoginLine>
          <LoginWrapper>
            <Button type={'submit'} color={'black'} bgColor={blue} fontSize={1.5} width={11} height={4}>
              로그인
            </Button>

            <LoginBtn>
              <GoogleAuth clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`} />

              <Button
                onClick={() => navigate('/signup')}
                type={'button'}
                color={'black'}
                bgColor={blue}
                fontSize={1.5}
                width={14}
                height={4}
              >
                회원가입
              </Button>
            </LoginBtn>
          </LoginWrapper>
        </Form>
      </BaseBgBox>
    </Wrapper>
  );
}
