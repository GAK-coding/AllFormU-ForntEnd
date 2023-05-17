import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import BaseBgBox from '../../components/ui/BaseBgBox';
import { BtnBox, Form, Line, Match, MisMatch, PageInfo } from './styles';
import Input from '../../components/ui/Input';
import { signUpInfo } from '../../typings/user';
import Button from '../../components/ui/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { checkEmail, signUp, emailCheckNum } from '../../api/user';
import { useMutation } from 'react-query';
import { signUpUserInfo } from '../../recoil/User/atom';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../hooks/useMessage';

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

  const [checkInfo, setCheckInfo] = useState<InputInfo>({
    checkEmail: '',
    checkPassword: '',
  });

  const { mutate: signUpRequest, isSuccess } = useMutation(signUp);

  const { showMessage, contextHolder } = useMessage();

  const onClick = useCallback(
    (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!isValid) {
        showMessage('warning', '비밀번호 조건이 일치하지 않습니다.');
        return;
      }

      if (!checkPw) {
        showMessage('error', '비밀번호가 일치하지 않습니다.');
        return;
      }

      if (!checkENum) {
        showMessage('error', '인증번호가 일치하지 않습니다.');
        return;
      } else {
        signUpRequest({ nickname, email, password });
      }
    },
    [userInfo, checkInfo, checkPw, checkENum, isValid]
  );

  useEffect(() => {
    if (isSuccess) {
      navigate('/signin');
      showMessage('success', '회원가입이 완료되었습니다.');
    }
  }, [isSuccess]);

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
      if (emailStatus.httpStatus === 'OK' || emailStatus.httpStatus === 'BAD_REQUEST') {
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
      if (checkNum.httpStatus === 'OK') {
        setEmailNum(checkNum.message);
        console.log('이메일 인증번호 번호 ' + emailNum);
        showMessage('success', '인증번호가 전송 되었습니다.');
      }
    }
  }, [checkNumSucsess]);

  const onCheck = () => {
    if (checkInfo.checkEmail === emailNum) {
      showMessage('success', '인증번호가 확인되었습니다.');
      setCheckENum(true);
    } else showMessage('error', '인증번호가 일치하지 않습니다.');
  };

  useEffect(() => {
    if (userInfo.password === checkInfo.checkPassword) {
      setCheckPw(true);
    } else {
      setCheckPw(false);
    }
  }, [userInfo.password, checkInfo.checkPassword]);

  return (
    <BaseBgBox>
      {contextHolder}
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
          <Button onClick={onCheckEmail} color={'black'} bgColor={blue} fontSize={1.3} width={8} height={3.5}>
            인증번호 전송
          </Button>
        </Line>

        {emailSuccess &&
          (emailStatus.httpStatus === 'OK' || emailStatus.httpStatus === 'BAD_REQUEST' ? (
            <Match>
              <div />
              인증번호가 전송되었습니다.
            </Match>
          ) : (
            <MisMatch>
              <div />
              {emailStatus.message}
            </MisMatch>
          ))}

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
          <Button onClick={onCheck} color={'black'} bgColor={blue} fontSize={1.3} width={8} height={3.5}>
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
          <Button type={'submit'} color={'black'} bgColor={blue} fontSize={1.5} width={15} height={4}>
            회원가입 완료
          </Button>
        </BtnBox>
      </Form>
    </BaseBgBox>
  );
}
