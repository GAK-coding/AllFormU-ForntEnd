import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import BaseBgBox from '../../components/ui/BaseBgBox';
import { BtnBox, Form, Line, Match, MisMatch, PageInfo } from './styles';
import Input from '../../components/ui/Input';
import { signUpInfo } from '../../typings/user';
import Button from '../../components/ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { signUp } from '../../api/user';
import GoogleAuth from '../../components/GoogleLogin/GoogleAuth';
import { GoogleLogin } from '@react-oauth/google';

interface InputInfo extends signUpInfo {
  checkEmail: string;
  checkPassword: string;
}

export default function SignUp() {
  const { blue } = useRecoilValue(color);

  const [checkPw, setCheckPw] = useState(false);
  const [checkENum, setCheckENum] = useState(false);

  const [info, setInfo] = useState<InputInfo>({
    name: '',
    email: '',
    checkEmail: '',
    password: '',
    checkPassword: '',
  });

  const { name, email, checkEmail, password, checkPassword } = info;

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof InputInfo) => {
      const temp = { ...info };
      temp[value] = e.target.value;
      setInfo(temp);
    },
    [info]
  );

  const onClick = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      if (!checkPw) {
        alert('비밀번호가 틀렸습니다.');
        return;
      }

      e.preventDefault();

      signUp({ name, email, password })
        .then(() => alert('회원가입에 성공하셨습니다!'))
        .catch((err) => console.error(err));
    },
    [name, email, checkEmail, password, checkPassword, checkPw]
  );

  const onSendNum = () => {
    //메일로 인증번호 보내기
  };

  const onCheck = () => {
    if (checkENum === true) alert('확인 되었습니다.');
    else alert('인증번호가 일치하지 않습니다.');
  };

  useEffect(() => {
    if (info.password === info.checkPassword) setCheckPw(true);
    else setCheckPw(false);
  }, [info.password, info.checkPassword]);

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <BaseBgBox>
      <PageInfo>
        <div>Sign Up</div>
        <div>
          <img src="/images/logo.png" alt="logo" />
          <span>All Form U</span>
        </div>
      </PageInfo>
      <Form onSubmit={onClick}>
        <Line>
          <span>이름</span>

          <Input
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'name')}
            placeholder={'이름'}
            width={25}
            height={1.8}
            size={1.4}
          />
        </Line>

        <Line>
          <span>Email</span>

          <Input
            type={'email'}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'email')}
            placeholder={'이메일'}
            width={25}
            height={1.8}
            size={1.4}
          />
          <Button onClick={onSendNum} color={'black'} bgColor={blue} fontSize={1.3} width={9} height={3.5}>
            인증번호 전송
          </Button>
        </Line>

        <Line>
          <span>인증번호</span>

          <Input
            type={'text'}
            value={checkEmail}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'checkEmail')}
            placeholder={'인증번호'}
            width={25}
            height={1.8}
            size={1.4}
          />
          <Button onClick={onCheck} color={'black'} bgColor={blue} fontSize={1.3} width={9} height={3.5}>
            완료
          </Button>
        </Line>

        <Line>
          <span>비밀번호</span>

          <Input
            type={'password'}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'password')}
            placeholder={'비밀번호'}
            width={25}
            height={1.8}
            size={1.4}
          />
        </Line>

        <Line>
          <span>비밀번호 확인</span>

          <Input
            type={'password'}
            value={checkPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'checkPassword')}
            placeholder={'비밀번호 확인'}
            width={25}
            height={1.8}
            size={1.4}
          />
        </Line>

        {password && checkPassword && checkPw && <Match>비밀번호가 일치합니다!</Match>}
        {password && checkPassword && !checkPw && <MisMatch>비밀번호가 불일치합니다.</MisMatch>}

        <BtnBox>
          <Button type={'submit'} color={'black'} bgColor={blue} fontSize={1.5} width={11} height={4}>
            회원가입
          </Button>

          {/* <Button color={'black'} bgColor={blue} fontSize={1.5} width={20} height={4}>
            <img src="/images/google.png" alt="google" />
            구글 계정으로 시작
          </Button> */}
          <GoogleAuth clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`} />
        </BtnBox>
      </Form>
    </BaseBgBox>
  );
}
