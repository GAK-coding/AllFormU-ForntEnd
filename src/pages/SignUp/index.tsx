import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import BaseBgBox from '../../components/ui/BaseBgBox';
import { BtnBox, Form, Line, Match, MisMatch, PageInfo } from './styles';
import Input from '../../components/ui/Input';
import { signUpInfo } from '../../typings/user';
import Button from '../../components/ui/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { signUp } from '../../api/user';
import GoogleAuth from '../../components/GoogleLogin/GoogleAuth';
import { useMutation } from 'react-query';
import { signUpUserInfo } from '../../recoil/User/atom';

interface InputInfo {
  checkEmail: string;
  checkPassword: string;
}

export default function SignUp() {
  const { blue } = useRecoilValue(color);
  const [userInfo, setUserInfo] = useRecoilState(signUpUserInfo);
  const { name, email, password } = useRecoilValue(signUpUserInfo);

  const [checkPw, setCheckPw] = useState(false);
  const [checkENum, setCheckENum] = useState(false);

  // 이메일 인증번호 = ENum;
  const ENum = '000';

  const [checkInfo, setCheckInfo] = useState<InputInfo>({
    checkEmail: '',
    checkPassword: '',
  });

  const { mutate } = useMutation(signUp);

  const onClick = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      if (!checkPw) {
        alert('비밀번호가 틀렸습니다.');
        return;
      }

      if (!checkENum) {
        alert('인증번호가 일치하지 않습니다.');
        return;
      }
      e.preventDefault();

      mutate({ name, email, password });
    },
    [userInfo, checkInfo]
  );

  const onChangeCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof InputInfo) => {
      const temp = { ...checkInfo };
      temp[value] = e.target.value;

      setCheckInfo(temp);
    },
    [checkInfo]
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof signUpInfo) => {
      const temp = { ...userInfo };
      temp[value] = e.target.value;

      setUserInfo(temp);
    },
    [userInfo]
  );

  const onSendNum = () => {
    //메일로 인증번호 보내기
  };

  const onCheck = () => {
    if (checkInfo.checkEmail === ENum) {
      alert('확인 되었습니다.');
      setCheckENum(true);
    } else alert('인증번호가 일치하지 않습니다.');
  };

  useEffect(() => {
    if (userInfo.password === checkInfo.checkPassword) setCheckPw(true);
    else setCheckPw(false);
  }, [userInfo.password, checkInfo.checkPassword]);

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
            width={'50%'}
            height={1.8}
            size={1.4}
          />
          <div />
          <button className={'disabled'} disabled={true} />
        </Line>

        <Line>
          <span>Email</span>

          <Input
            type={'email'}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'email')}
            placeholder={'이메일'}
            width={'50%'}
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
            value={checkInfo.checkEmail}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeCheck(e, 'checkEmail')}
            placeholder={'인증번호'}
            width={'50%'}
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
            width={'50%'}
            height={1.8}
            size={1.4}
          />{' '}
          <button className={'disabled'} disabled={true} />
        </Line>

        <Line>
          <span>비밀번호 확인</span>
          <Input
            type={'password'}
            value={checkInfo.checkPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeCheck(e, 'checkPassword')}
            placeholder={'비밀번호 확인'}
            width={'50%'}
            height={1.8}
            size={1.4}
          />{' '}
          <button className={'disabled'} disabled={true} />
        </Line>

        {password && checkInfo.checkPassword && checkPw && (
          <Match>
            <div />
            비밀번호가 일치합니다!
          </Match>
        )}

        {password && checkInfo.checkPassword && !checkPw && (
          <MisMatch>
            {' '}
            <div />
            비밀번호가 불일치합니다.
          </MisMatch>
        )}

        <BtnBox>
          <Button type={'submit'} color={'black'} bgColor={blue} fontSize={1.5} width={11} height={4}>
            회원가입
          </Button>

          <GoogleAuth clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`} />
        </BtnBox>
      </Form>
    </BaseBgBox>
  );
}
