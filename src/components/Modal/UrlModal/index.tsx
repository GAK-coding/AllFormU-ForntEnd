import { CheckModalWrapper, ModalTitle, UserInfo, InputInfo, UrlInfo } from '../styles';
import { Input } from 'antd';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../../hooks/useMessage';
import { useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';

interface Props {
  open: boolean;
  onCancel: () => void;
}

interface InputInfo {
  url: string;
}

export default function UrlModal({ open, onCancel }: Props) {
  const navigate = useNavigate();
  const { showMessage, contextHolder } = useMessage();

  const { lightPurple } = useRecoilValue(color);

  const [input, setInput] = useState<InputInfo>({
    url: '',
  });

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: keyof InputInfo) => {
      const temp = { ...input };
      temp[value] = e.target.value;
      setInput(temp);
    },
    [input]
  );

  const onEnterUrl = useCallback(
    (e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();

      const url = input.url.slice(input.url.indexOf('/', input.url.indexOf('//') + 2));
      navigate(`${url}`);

      onCancel();
    },
    [input]
  );

  return (
    <CheckModalWrapper
      title={<ModalTitle>설문 응답</ModalTitle>}
      width={450}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      {contextHolder}
      <UserInfo onSubmit={onEnterUrl}>
        <span>설문 url 주소를 입력해주세요.</span>
        <UrlInfo>
          <Input
            type={'text'}
            value={input.url}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, 'url')}
            placeholder={'설문 url 주소'}
            height={2}
          />
        </UrlInfo>

        <Button type={'submit'} color={'#696969'} bgColor={lightPurple} fontSize={1.3} width={7} height={4}>
          확인
        </Button>
      </UserInfo>
    </CheckModalWrapper>
  );
}
