import React from 'react';
import { MakeFormModalWrapper } from '../MakeFromModal/styles';
import { ResModalTitle } from '../../ResForm/ResFormModal/styles';
import { QRCode } from 'antd';
import { UrlWrapper } from './styles';
import { useCopyClipBoard } from '../../../hooks/useCopyClipBoard';
import Button from '../../ui/Button';
import { color } from '../../../recoil/Color/atom';
import { useRecoilValue } from 'recoil';

interface Props {
  open: boolean;
  onCancel: () => void;
  formId: number;
}

export default function UrlModal({ open, onCancel, formId }: Props) {
  const [isCopy, onCopy] = useCopyClipBoard();
  const url = `http://localhost:3000/resform/direct/${formId}`;
  const { purple } = useRecoilValue(color);

  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
  };

  return (
    <MakeFormModalWrapper
      title={<ResModalTitle>링크 생성</ResModalTitle>}
      width={500}
      open={open}
      onCancel={onCancel}
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
      </UrlWrapper>
    </MakeFormModalWrapper>
  );
}
