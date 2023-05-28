import React, { useCallback, useEffect, useState } from 'react';
import { FormInputWrapper } from './styles';
import { useLocation, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { addContent, editFormInfo, selectInfoUpdate, updateContent } from '../../../api/editForm';
import { debounce } from 'lodash';
import { useMessage } from '../../../hooks/useMessage';
import { useRecoilState } from 'recoil';
import { questions } from '../../../recoil/MakeForm/atom';
import { SelectionQue } from '../../../typings/makeForm';

interface Props {
  width?: string;
  fontSize: number;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  queId?: number;
  optId?: number;
  row?: number;
  col?: number;
}

export default function FormInput({
  value,
  onChange,
  width = '50%',
  queId,
  optId,
  fontSize,
  placeholder,
  disabled,
  row,
  col,
}: Props) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [questionList, setQuestionList] = useRecoilState(questions);
  const [pushOptId, setPushOptId] = useState(-1);

  const { mutate: selectInfoUpdateMutate } = useMutation(() => selectInfoUpdate(+id!, queId!, value));
  const { mutate: updateContentMutate } = useMutation(() => updateContent(queId!, optId!, value));
  const { mutate: addContentMutate, data } = useMutation(() => addContent({ queId: queId!, content: value }), {
    onSuccess: (data) => {
      setPushOptId(data!);
    },
  });
  const { showMessage, contextHolder } = useMessage();

  const onBlur = useCallback(
    debounce(() => {
      if (pathname.slice(1, 16) !== 'mypage/editform') return;
      if (placeholder === '질문') {
        selectInfoUpdateMutate();
      } else if (!optId) {
        addContentMutate();
      } else {
        updateContentMutate();
      }

      showMessage('success', '업데이트 완료!');
    }, 200),
    [value, optId]
  );

  useEffect(() => {
    if (pushOptId !== -1 && row && col) {
      const temp = JSON.parse(JSON.stringify(questionList));
      temp[row!][col!].options[temp[row!][col!].options.length - 1].id = pushOptId;
      setQuestionList(temp);

      setPushOptId(-1);
    }
  }, [pushOptId, row, col]);

  return (
    <>
      {contextHolder}
      <FormInputWrapper
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        width={width}
        fontSize={fontSize}
        disabled={disabled}
        placeholder={placeholder}
        required
      />
    </>
  );
}
