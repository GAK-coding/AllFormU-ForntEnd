import React, { ChangeEvent, useCallback } from 'react';
import BaseQuestion from '../BaseQuestion';
import { useRecoilState } from 'recoil';
import { formInfo } from '../../../recoil/MakeForm/atom';
import { Description, FormTitleWrapper, TitleInput } from './styles';

export default function FormTitle() {
  const [info, setInfo] = useRecoilState(formInfo);

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInfo({ ...info, title: e.target.value });
    },
    [info.title]
  );

  const onChangeDescription = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setInfo({ ...info, description: e.target.value });
    },
    [info.description]
  );

  return (
    <BaseQuestion>
      <FormTitleWrapper>
        <TitleInput value={info.title} onChange={onChangeTitle} placeholder={'설문 제목 입력'} />
        <Description
          showCount
          maxLength={300}
          style={{ height: 80, resize: 'none', backgroundColor: 'yellow' }}
          value={info.description}
          onChange={onChangeDescription}
          placeholder="설문 설명"
        />
      </FormTitleWrapper>
    </BaseQuestion>
  );
}
