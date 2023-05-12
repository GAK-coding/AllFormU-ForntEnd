import React, { ChangeEvent, useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { formInfo } from '../../../recoil/MakeForm/atom';
import { FormTitleWrapper, TitleInput } from './styles';
import TextArea from 'antd/es/input/TextArea';
import { QueWrapper } from '../MakeQueBase/styles';
import { useMutation, useQuery } from 'react-query';
import { GetFormInfo } from '../../../typings/getForm';
import { getFormInfo } from '../../../api/getFormInfo';
import { editFormInfo } from '../../../api/editForm';
import { debounce } from 'lodash';

interface Props {
  isEdit?: boolean;
  formId?: string;
}

export default function FormTitle({ isEdit, formId }: Props) {
  const [info, setInfo] = useRecoilState(formInfo);
  const { mutate, isLoading, error, isError } = useMutation(() => editFormInfo(1, +formId!, info.title, info.content));

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInfo({ ...info, title: e.target.value });
    },
    [info]
  );

  const onChangeContent = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setInfo({ ...info, content: e.target.value });
    },
    [info]
  );

  const onBlur = useCallback(
    debounce(() => {
      if (isEdit) {
        mutate();
      }
    }, 3000),
    [isEdit, info]
  );

  return (
    <QueWrapper style={{ backgroundColor: '#F5F5F5' }}>
      <FormTitleWrapper>
        <TitleInput
          onBlur={onBlur}
          value={info.title}
          onChange={onChangeTitle}
          placeholder={'설문 제목 입력'}
          required
        />
        <TextArea
          onBlur={onBlur}
          showCount
          maxLength={300}
          style={{ height: 80, resize: 'none' }}
          value={info.content}
          onChange={onChangeContent}
          placeholder="설문 설명"
          required
        />
      </FormTitleWrapper>
    </QueWrapper>
  );
}
