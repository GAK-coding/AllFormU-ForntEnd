import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import BaseBgBox from '../../components/ui/BaseBgBox';
import { Form, LoginBtn, LoginLine, LoginWrapper, PageInfo, Wrapper } from '../SignUp/styles';
import Input from '../../components/ui/Input';
import { signInInfo, user } from '../../typings/user';
import Button from '../../components/ui/Button';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { useNavigate } from 'react-router-dom';
import { userInfo, signInUserInfo, isLogin } from '../../recoil/User/atom';
import GoogleAuth from '../../components/GoogleLogin/GoogleAuth';
import { useMutation } from 'react-query';
import { signIn } from '../../api/user';
import IdMordal from '../../components/Modal/IdModal';
import { useMessage } from '../../hooks/useMessage';

export default function SignIn() {
  const { showMessage, contextHolder } = useMessage();
  const { blue } = useRecoilValue(color);
  const [userInput, setUserInput] = useRecoilState(signInUserInfo);
  const { email, password } = useRecoilValue(signInUserInfo);
  const [info, setUserInfo] = useRecoilState(userInfo);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setLogin = useSetRecoilState(isLogin);
  const [user, setUser] = useRecoilState(userInfo);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof signInInfo) => {
      const temp = { ...userInput };
      temp[value] = e.target.value;

      setUserInput(temp);
    },
    [userInput]
  );

  const { mutate, data, isSuccess } = useMutation(signIn);

  const onClick = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      mutate({ email, password });
    },
    [email, password]
  );

  useEffect(() => {
    if (isSuccess) {
      if (data.httpStatus === 'CONFLICT') {
        showMessage('error', '비밀번호가 일치하지 않습니다.');
        return;
      }
      if (data.httpStatus === 'NOT_FOUND') {
        showMessage('error', '존재하지 않는 이메일입니다.');
        return;
      }
      if (data.httpStatus === 'BAD_REQUEST') {
        showMessage('warning', '휴면 계정입니다. 재회원가입을 통해 휴면 상태를 해제해주세요.');
        return;
      } else {
        const infoList = {
          id: data.id,
          nickname: data.nickname,
          email: data.email,
          password: data.password,
          image: data.image,
        };
        setUserInfo(infoList);
        setUser(infoList);
        localStorage.setItem('accessToken', data.tokenDTO.accessToken);
        setLogin(true);
        navigate('/');

        // 이걸 어쩌지

        // setTimeout(() => {
        //   navigate('/');
        //   showMessage('success', '로그인 되었습니다.');
        // }, 1000);
      }
    }
  }, [data, isSuccess]);

  return (
    <Wrapper>
      {contextHolder}
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

          <LoginLine>{/* <div onClick={showModal}>비밀번호 찾기</div> */}</LoginLine>
          <IdMordal open={isModalOpen} onCancel={handleCancel} />

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
