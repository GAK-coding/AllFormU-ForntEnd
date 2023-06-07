import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { CheckModalWrapper, InputInfo, ModalTitle, UserInfo } from '../styles';
import { Input } from 'antd';
import Button from '../../ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { userInfo } from '../../../recoil/User/atom';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../../hooks/useMessage';
import { useMutation } from 'react-query';
import { signIn } from '../../../api/user';

interface Props {
  open: boolean;
  onCancel: () => void;
}

interface InputInfo {
  password: string;
}

export default function PasswordMordal({ open, onCancel }: Props) {
  const navigate = useNavigate();
  const { showMessage, contextHolder } = useMessage();

  const { lightPurple } = useRecoilValue(color);

  const [input, setInput] = useState<InputInfo>({
    password: '',
  });

  const info = useRecoilValue(userInfo);
  const { mutate, data, isSuccess } = useMutation(signIn);

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

  const onCheckPassword = useCallback(
    (e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();

      // if (info.password === password) {
      //   setCheck(true);
      // } else {
      //   showMessage('error', '비밀번호가 일치하지 않습니다.');
      // }

      const email = info.email;
      mutate({ email, password });
    },
    [input]
  );

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      if (data.httpStatus === 'CONFLICT') {
        showMessage('error', '비밀번호가 일치하지 않습니다.');
        return;
      } else {
        setCheck(true);
      }
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (check) {
      navigate('/mypage/edit');
    } else {
      showMessage('error', '비밀번호가 일치하지 않습니다.');
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
      {contextHolder}
      <UserInfo onSubmit={onCheckPassword}>
        <span>비밀번호를 입력해주세요.</span>
        <InputInfo>
          <Input
            type={'password'}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'password')}
            placeholder={'비밀번호'}
            height={2}
          />
        </InputInfo>

        <Button type={'submit'} color={'#696969'} bgColor={lightPurple} fontSize={1.3} width={7} height={4}>
          확인
        </Button>
      </UserInfo>
    </CheckModalWrapper>
  );
}
