import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import BaseBgBox from '../../components/ui/BaseBgBox';
import { Form, Line, Match, MisMatch, PageInfo } from './styles';
import Input from '../../components/ui/Input';
import { signUpInfo } from '../../typings/user';
import Button from '../../components/ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { signUp } from '../../api/user';

interface InputInfo extends signUpInfo {
  checkPassword: string;
}

export default function SignUp() {
  const { blue } = useRecoilValue(color);
  const [checkPw, setCheckPw] = useState(false);

  const [info, setInfo] = useState<InputInfo>({
    name: '',
    email: '',
    password: '',
    checkPassword: '',
  });

  const { name, email, password, checkPassword } = info;

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
    [name, email, password, checkPassword, checkPw]
  );

  useEffect(() => {
    if (info.password === info.checkPassword) setCheckPw(true);
    else setCheckPw(false);
  }, [info.password, info.checkPassword]);

  return (
    <BaseBgBox>
      <PageInfo>
        <div>Sign Up</div>
        <div>
          <img src="logo.png" alt="logo" />
          <span>All Form U</span>
        </div>
      </PageInfo>
      <Form onSubmit={onClick}>
        <Line>
          <div>
            <span>이름</span>
          </div>
          <Input
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'name')}
            placeholder={'이름'}
            width={44}
            height={3.5}
            size={2.2}
          />
        </Line>
        <Line>
          <div>
            <span>Email</span>
          </div>
          <Input
            type={'email'}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'email')}
            placeholder={'이메일'}
            width={44}
            height={3.5}
            size={2.2}
          />
        </Line>
        <Line>
          <div>
            <span>비밀번호</span>
          </div>
          <Input
            type={'password'}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'password')}
            placeholder={'비밀번호'}
            width={44}
            height={3.5}
            size={2.2}
          />
        </Line>
        <Line>
          <div>
            <span>비밀번호 확인</span>
          </div>
          <Input
            type={'password'}
            value={checkPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'checkPassword')}
            placeholder={'비밀번호 확인'}
            width={44}
            height={3.5}
            size={2.2}
          />
        </Line>
        {password && checkPassword && checkPw && <Match>비밀번호가 일치합니다!</Match>}
        {password && checkPassword && !checkPw && <MisMatch>비밀번호가 불일치합니다.</MisMatch>}

        <Line>
          <div />
          <Button type={'submit'} color={'black'} bgColor={blue} fontSize={2} width={12} height={5}>
            회원가입
          </Button>
        </Line>
      </Form>
    </BaseBgBox>
  );
}
