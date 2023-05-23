import React, { useCallback } from 'react';
import { ResModalTitle } from '../../../GPT/GPTModal/styles';
import { QRCode } from 'antd';
import { UrlWrapper } from './styles';
import Button from '../../../ui/Button';
import { color } from '../../../../recoil/Color/atom';
import { useRecoilValue } from 'recoil';
import { MakeFormModalWrapper } from '../MakeFromModal/styles';
import { useNavigate } from 'react-router-dom';
import { useCopyClipBoard } from '../../hooks/useCopyClipBoard';

interface Props {
  open: boolean;
  formId: number;
}

export default function UrlModal({ open, formId }: Props) {
  const [isCopy, onCopy] = useCopyClipBoard();
  const { purple, blue } = useRecoilValue(color);
  const navigate = useNavigate();
  const url = `http://localhost:3000/resform/direct/${formId}`;

  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
  };

  const onClickCheck = useCallback(() => {
    navigate(`/mypage/makeform`);
  }, []);

  return (
    <MakeFormModalWrapper
      title={<ResModalTitle>링크 생성</ResModalTitle>}
      width={500}
      open={open}
      onCancel={onClickCheck}
      footer={null}
      centered
    >
      <UrlWrapper>
        <QRCode errorLevel="H" value={url} icon="/images/logo.png" />
        <div>
          <span>http://localhost:3000/resform/direct/{formId}</span>
          <Button
            onClick={() => handleCopyClipBoard(url)}
            color={'white'}
            bgColor={purple}
            fontSize={1.6}
            width={'8rem'}
            height={'4rem'}
          >
            copy
          </Button>
        </div>
        <Button onClick={onClickCheck} color={'black'} bgColor={blue} fontSize={1.6} width={'8rem'} height={'4rem'}>
          확인
        </Button>
      </UrlWrapper>
    </MakeFormModalWrapper>
  );
}
