import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { CheckModalWrapper, ModalTitle, UserInfo } from '../styles';
import { Input } from 'antd';
import Button from '../../ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { userInfo } from '../../../recoil/User/atom';
import { useNavigate } from 'react-router-dom';

interface Props {
  open: boolean;
  onCancel: () => void;
}

interface InputInfo {
  password: string;
}

export default function PasswordMordal({ open, onCancel }: Props) {
  const navigate = useNavigate();
  const { lightPurple } = useRecoilValue(color);

  const [input, setInput] = useState<InputInfo>({
    password: '',
  });

  const info = useRecoilValue(userInfo);

  const { password } = input;
  const [check, setCheck] = useState(false);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof InputInfo) => {
      const temp = { ...input };
      temp[value] = e.target.value;
      setInput(temp);
    },
    [input]
  );

  const onCheckPassword = useCallback(() => {
    if (info.password === password) {
      setCheck(true);
    }
  }, [password]);

  useEffect(() => {
    if (check) {
      navigate('/mypage/edit');
    }
  }, [check]);

  return (
    <CheckModalWrapper
      title={<ModalTitle>마이페이지 수정</ModalTitle>}
      width={450}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <UserInfo>
        <span>비밀번호를 입력해주세요.</span>
        <Input
          type={'password'}
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'password')}
          placeholder={'비밀번호'}
          height={2}
        />

        <Button onClick={onCheckPassword} color={'#696969'} bgColor={lightPurple} fontSize={1.3} width={7} height={4}>
          확인
        </Button>
      </UserInfo>
    </CheckModalWrapper>
  );
}
