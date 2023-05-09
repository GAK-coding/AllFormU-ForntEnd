import { Input } from 'antd';
import { FindWrapper, InputId, Logo, ResultWrapper } from './styles';
import Button from '../../components/ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../recoil/Color/atom';
import { ChangeEvent, useCallback, useState } from 'react';
import { signInInfo } from '../../typings/user';
import { useNavigate } from 'react-router-dom';
import FixedButton from '../../components/FixedButton';

export default function FindPassword() {
  const { blue } = useRecoilValue(color);

  const [info, setInfo] = useState<signInInfo>({
    email: '',
    password: '',
  });
  const { email } = info;
  const [sendId, setCheckId] = useState(false);

  const navigate = useNavigate();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof signInInfo) => {
      const temp = { ...info };
      temp[value] = e.target.value;
      setInfo(temp);
    },
    [info]
  );

  const onCheck = () => {
    //아이디 보내는 코드
    setCheckId(true);
  };

  return (
    <FindWrapper>
      <div>
        <Logo>
          <img src="/images/headerlogo.png" alt="logo" />
        </Logo>
        <InputId>
          <span>비밀번호 찾기</span>
          <div>
            <span>Email</span>
            <Input
              type={'email'}
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'email')}
              placeholder={'이메일'}
              width={30}
              height={2}
            />
            <Button onClick={onCheck} color={'black'} bgColor={blue} fontSize={1.2} width={8} height={3}>
              확인
            </Button>
          </div>
        </InputId>

        {sendId && (
          <ResultWrapper>
            <span>임시 비밀번호가 발급 되었습니다.</span>
            <span>이메일을 확인해주세요.</span>

            <Button
              onClick={() => navigate('/signin')}
              color={'black'}
              bgColor={blue}
              fontSize={1.5}
              width={15}
              height={4}
            >
              로그인으로 이동
            </Button>
          </ResultWrapper>
        )}
      </div>
    </FindWrapper>
  );
}
