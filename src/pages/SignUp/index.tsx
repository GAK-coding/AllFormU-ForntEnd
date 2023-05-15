import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import BaseBgBox from '../../components/ui/BaseBgBox';
import { BtnBox, Form, Line, Match, MisMatch, PageInfo } from './styles';
import Input from '../../components/ui/Input';
import { signUpInfo } from '../../typings/user';
import Button from '../../components/ui/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { checkEmail, signUp, emailCheckNum } from '../../api/user';
import GoogleAuth from '../../components/GoogleLogin/GoogleAuth';
import { useMutation } from 'react-query';
import { signUpUserInfo } from '../../recoil/User/atom';
import { useNavigate } from 'react-router-dom';

interface InputInfo {
  checkEmail: string;
  checkPassword: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const { blue } = useRecoilValue(color);

  const [userInfo, setUserInfo] = useRecoilState(signUpUserInfo);
  const { nickname, email, password } = useRecoilValue(signUpUserInfo);

  const [isValid, setIsValid] = useState(false);
  const [checkPw, setCheckPw] = useState(false);
  const [checkENum, setCheckENum] = useState(false);

  // 이메일 인증번호 = ENum;
  // const ENum = '000';

  const [checkInfo, setCheckInfo] = useState<InputInfo>({
    checkEmail: '',
    checkPassword: '',
  });

  const { mutate: signUpRequest } = useMutation(signUp);

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

      signUpRequest({ nickname, email, password });
      navigate('/signin');
    },
    [userInfo, checkInfo, checkPw, checkENum]
  );

  const onChangeCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof InputInfo) => {
      const temp = { ...checkInfo };
      temp[value] = e.target.value;

      setCheckInfo(temp);
    },
    [checkInfo.checkEmail, checkInfo.checkPassword]
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof signUpInfo) => {
      const temp = { ...userInfo };
      temp[value] = e.target.value;

      if (value === 'password') {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
        setIsValid(passwordRegex.test(e.target.value));
      }

      setUserInfo(temp);
    },
    [userInfo.nickname, userInfo.email, userInfo.password]
  );

  // 이메일 중복체크
  const {
    mutate: sendEmail,
    data: emailStatus,
    isSuccess: emailSuccess,
  } = useMutation(checkEmail, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onCheckEmail = useCallback(() => {
    sendEmail({ email });
    console.log(emailStatus);
  }, [userInfo.email]);

  useEffect(() => {
    if (emailSuccess) {
      if (emailStatus.httpStatus === 'OK') {
        console.log('성공' + emailStatus.httpStatus);
        // 인증번호 요청보냄
        onSendEmail();
      } else {
        console.log('실패' + emailStatus.httpStatus);
      }
    }
  }, [emailSuccess]);

  // 인증번호 전송
  const [emailNum, setEmailNum] = useState<string>('');
  const { mutate: sendEmailNum, data: checkNum, isSuccess: checkNumSucsess } = useMutation(emailCheckNum);

  const onSendEmail = useCallback(() => {
    const num = 0;
    sendEmailNum({ email, num });
  }, [userInfo.email]);

  useEffect(() => {
    if (checkNumSucsess) {
      console.log('이메일 인증번호 받기 성공' + checkNum);
      setEmailNum(checkNum.message);
      console.log('이메일 인증번호 번호 받고 나서임' + emailNum);
    }
  }, [checkNumSucsess]);

  const onCheck = () => {
    if (checkInfo.checkEmail === emailNum) {
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
            value={nickname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'nickname')}
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
          <Button onClick={onCheckEmail} color={'black'} bgColor={blue} fontSize={1.3} width={9} height={3.5}>
            인증번호 전송
          </Button>
        </Line>
        {emailSuccess && (
          <Match>
            <div />
            {emailStatus.message}
          </Match>
        )}
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

        {password &&
          (isValid ? (
            <Match>
              <div />
              사용가능한 비밀번호입니다.
            </Match>
          ) : (
            <MisMatch>
              <div />
              비밀번호는 8~15자리의 영문, 숫자, 특수문자 조합으로 입력해주세요.
            </MisMatch>
          ))}

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

        {password &&
          checkInfo.checkPassword &&
          (checkPw ? (
            <Match>
              <div />
              비밀번호가 일치합니다.
            </Match>
          ) : (
            <MisMatch>
              <div />
              비밀번호가 불일치합니다.
            </MisMatch>
          ))}

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
