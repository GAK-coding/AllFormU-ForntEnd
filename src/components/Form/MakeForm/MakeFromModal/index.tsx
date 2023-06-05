import React, { useCallback, useState } from 'react';
import { ResModalTitle } from '../../../GPT/GPTModal/styles';
import { CreateForm, FormInfo, FormInfoWrapper, MakeFormModalWrapper } from './styles';
import { ConfigProvider, DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import Button from '../../../ui/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../../../recoil/Color/atom';
import { FormBgColor, formFix, formInfo, period, questions, sectionNames } from '../../../../recoil/MakeForm/atom';
import UrlModal from '../UrlModal';
import { useMutation } from 'react-query';
import { createForm } from '../../../../api/makeform';
import { useMessage } from '../../../../hooks/useMessage';
import locale from 'antd/lib/locale/ko_KR';

const { RangePicker } = DatePicker;

interface Props {
  open: boolean;
  onCancel: () => void;
  isCreate: boolean;
  setIsCreate: (value: boolean) => void;
}

export default function MakeFromModal({ open, onCancel, isCreate, setIsCreate }: Props) {
  const questionList = useRecoilValue(questions);
  const { title, content, fimage } = useRecoilValue(formInfo);
  const { blue, lightPurple } = useRecoilValue(color);
  const [fix, setFix] = useRecoilState(formFix);
  const [time, setTime] = useRecoilState(period);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formId, setFormId] = useState(-1);
  const { showMessage, contextHolder } = useMessage();
  const fcolor = useRecoilValue(FormBgColor);
  const [sectionName, setSectionName] = useRecoilState(sectionNames);

  console.log(sectionName);

  const { mutate, data, isLoading, isError, error, isSuccess } = useMutation(createForm, {
    onSuccess: (data) => {
      setFormId(data);
    },
  });

  const formCreate = useCallback(() => {
    if (time.length === 0) return;

    if (!isCreate) {
      const questions = questionList.flat().map((item) => {
        const { tempId, ...rest } = item;
        return rest;
      });

      mutate({ title, fix, timeout: time, content, questions, fimage, fcolor, sectionName });
      setIsCreate(true);
      setTime([]);
    }
  }, [title, content, fimage, questionList, isCreate, fix, time, sectionName]);

  const showModal = useCallback(() => {
    if (time.length === 0) {
      showMessage('warning', '설문 기간을 설정해주세요.');
      return;
    }

    setIsModalOpen(true);
  }, [time]);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onFixAble = useCallback(() => {
    setFix(true);
  }, [fix]);

  const onFixDisAble = useCallback(() => {
    setFix(false);
  }, [fix]);

  const disabledDate = (current: dayjs.ConfigType) => {
    const currentDate = dayjs().startOf('day');
    const currentTime = dayjs().startOf('second');
    const selectedDateTime = dayjs(current);

    return (
      selectedDateTime.isBefore(currentDate) ||
      (selectedDateTime.isSame(currentDate) && selectedDateTime.isBefore(currentTime))
    );
  };

  return (
    <MakeFormModalWrapper
      title={<ResModalTitle>질문 세부 설명</ResModalTitle>}
      width={550}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      {contextHolder}
      <FormInfoWrapper>
        <FormInfo>
          <span>설문 기간</span>
          <span>
            <ConfigProvider locale={locale}>
              <RangePicker
                onChange={(value) => {
                  value?.[0] &&
                    value?.[1] &&
                    setTime([value[0]?.format('YYYY MM DD HH mm ss'), value[1]?.format('YYYY MM DD HH mm ss')]);
                }}
                showTime
                disabledDate={disabledDate}
              />
            </ConfigProvider>
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
