import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { CheckModalWrapper, ModalTitle, ResultWrapper, UserInfo } from '../styles';
import { Input } from 'antd';
import Button from '../../ui/Button';
import { useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { emailCheckNum } from '../../../api/user';

interface Props {
  open: boolean;
  onCancel: () => void;
}

interface InputInfo {
  email: string;
}

export default function IdMordal({ open, onCancel }: Props) {
  const { blue, lightPurple } = useRecoilValue(color);

  const [input, setInput] = useState<InputInfo>({
    email: '',
  });
  const { email } = input;

  const [sendId, setCheckId] = useState(false);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof InputInfo) => {
      const temp = { ...input };
      temp[value] = e.target.value;
      setInput(temp);
    },
    [input]
  );

  const { mutate: findPassword, isSuccess } = useMutation(emailCheckNum);

  const onCheck = useCallback(() => {
    const num = 1;
    findPassword({ email, num });
  }, [email]);

  useEffect(() => {
    if (isSuccess) {
      setCheckId(true);
    }
  }, [isSuccess]);

  return (
    <CheckModalWrapper
      title={<ModalTitle>비밀번호 찾기</ModalTitle>}
      width={450}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <UserInfo>
        {!sendId && (
          <>
            <span>Email을 입력해주세요.</span>
            <Input
              type={'email'}
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'email')}
              placeholder={'Email'}
              height={2}
            />
          </>
        )}

        {!sendId && (
          <Button onClick={onCheck} color={'#696969'} bgColor={lightPurple} fontSize={1.3} width={7} height={4}>
            확인
          </Button>
        )}

        {sendId && (
          <ResultWrapper>
            <span>임시 비밀번호가 발급 되었습니다.</span>
            <span>이메일을 확인해주세요.</span>

            <span>비밀번호 재설정을 꼭 부탁드립니다! </span>
          </ResultWrapper>
        )}
      </UserInfo>
    </CheckModalWrapper>
  );
}
