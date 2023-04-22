import React, { ChangeEvent, useCallback, useState } from 'react';
import BaseBgBox from '../../components/ui/BaseBgBox';
import { Form, Line, PageInfo } from '../SignUp/styles';
import Input from '../../components/ui/Input';
import { signInInfo } from '../../typings/user';
import Button from '../../components/ui/Button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { signIn } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../recoil/User/atom';

export default function SignIn() {
  const { subBlue } = useRecoilValue(color);
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
          <img src="logo.png" alt="logo" />
          <span>All Form U</span>
        </div>
      </PageInfo>
      <Form onSubmit={onClick}>
        <Line>
          <div>
            <span>Email</span>
          </div>
          <Input
            type={'email'}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'email')}
            placeholder={'이메일'}
            width={30}
            height={3}
            size={1.8}
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
            width={30}
            height={3}
            size={1.8}
          />
        </Line>

        <Line>
          <div />
          <Button type={'submit'} color={'black'} bgColor={subBlue} fontSize={1.8} width={10} height={4}>
            로그인
          </Button>
        </Line>

        <Line>
          <div />
          <Button
            onClick={() => navigate('/signup')}
            type={'button'}
            color={'black'}
            bgColor={subBlue}
            fontSize={1.8}
            width={14}
            height={4}
          >
            회원가입
          </Button>
        </Line>
      </Form>
    </BaseBgBox>
  );
}
