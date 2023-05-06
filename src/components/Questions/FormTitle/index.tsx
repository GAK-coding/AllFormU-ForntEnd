import React, { ChangeEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { formInfo } from '../../../recoil/MakeForm/atom';
import { FormTitleWrapper, TitleInput } from './styles';
import TextArea from 'antd/es/input/TextArea';
import { QueWrapper } from '../MakeQueBase/styles';

export default function FormTitle() {
  const [info, setInfo] = useRecoilState(formInfo);

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

  return (
    <QueWrapper style={{ backgroundColor: 'white' }}>
      <FormTitleWrapper>
        <TitleInput value={info.title} onChange={onChangeTitle} placeholder={'설문 제목 입력'} required />
        <TextArea
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
