import React, { useCallback } from 'react';
import { ResModalTitle } from '../../ResForm/ResFormModal/styles';
import { CreateForm, FormInfo, FormInfoWrapper, MakeFormModalWrapper } from './styles';
import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import Button from '../../ui/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../../recoil/Color/atom';
import { formFix } from '../../../recoil/MakeForm/atom';

interface Props {
  open: boolean;
  onCancel: () => void;
}

export default function MakeFromModal({ open, onCancel }: Props) {
  const { blue, lightPurple } = useRecoilValue(color);
  const [fix, setFix] = useRecoilState(formFix);

  const onFixAble = useCallback(() => {
    setFix(true);
  }, [fix]);

  const onFixDisAble = useCallback(() => {
    setFix(false);
  }, [fix]);

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });

  return (
    <MakeFormModalWrapper
      title={<ResModalTitle>질문 세부 설명</ResModalTitle>}
      width={500}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <FormInfoWrapper>
        <FormInfo>
          <span>마감 기간</span>
          <span>
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
            />
          </span>
        </FormInfo>
        <FormInfo>
          <span>응답 수정 여부</span>
          <span>
            <Button
              onClick={onFixAble}
              color={'black'}
              bgColor={fix ? lightPurple : 'white'}
              fontSize={1.6}
              width={8}
              height={3.5}
              border={fix ? 'none' : '1px solid #c4c4c4'}
            >
              O
            </Button>
            <Button
              onClick={onFixDisAble}
              color={'black'}
              bgColor={!fix ? lightPurple : 'white'}
              fontSize={1.6}
              width={8}
              height={3.5}
              border={fix ? '1px solid #c4c4c4' : 'none'}
            >
              X
            </Button>
          </span>
        </FormInfo>
        <CreateForm>
          <Button color={'black'} bgColor={blue} fontSize={1.6} width={13} height={5}>
            QR 생성
          </Button>
          <Button color={'black'} bgColor={blue} fontSize={1.6} width={13} height={5}>
            URL 생성
          </Button>
        </CreateForm>
      </FormInfoWrapper>
    </MakeFormModalWrapper>
  );
}
