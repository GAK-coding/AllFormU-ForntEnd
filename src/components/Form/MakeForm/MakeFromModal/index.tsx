import React, { useCallback, useState } from 'react';
import { ResModalTitle } from '../../../GPT/GPTModal/styles';
import { CreateForm, FormInfo, FormInfoWrapper, MakeFormModalWrapper } from './styles';
import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import Button from '../../../ui/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../../../recoil/Color/atom';
import { formFix, formInfo, questions } from '../../../../recoil/MakeForm/atom';
import UrlModal from '../UrlModal';
import { useMutation } from 'react-query';
import { createForm } from '../../../../api/makeform';

interface Props {
  open: boolean;
  onCancel: () => void;
  isCreate: boolean;
  setIsCreate: (value: boolean) => void;
}

export default function MakeFromModal({ open, onCancel, isCreate, setIsCreate }: Props) {
  const questionList = useRecoilValue(questions);
  const { title, content } = useRecoilValue(formInfo);
  const { blue, lightPurple } = useRecoilValue(color);
  const [fix, setFix] = useRecoilState(formFix);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formId, setFormId] = useState(-1);

  const { mutate, data, isLoading, isError, error, isSuccess } = useMutation(createForm, {
    onSuccess: (data) => {
      setFormId(data);
    },
  });

  const formCreate = useCallback(() => {
    if (!isCreate) {
      const questions = questionList.flat().map((item) => {
        const { tempId, ...rest } = item;
        return rest;
      });

      mutate({ title, content, questions });
      setIsCreate(true);
    }
  }, [title, content, questionList, isCreate]);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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
          <Button
            onClick={() => {
              showModal();
              formCreate();
            }}
            color={'black'}
            bgColor={blue}
            fontSize={1.6}
            width={13}
            height={4.5}
          >
            링크 생성
          </Button>
        </CreateForm>
      </FormInfoWrapper>
      <UrlModal open={isModalOpen} formId={formId} />
    </MakeFormModalWrapper>
  );
}
