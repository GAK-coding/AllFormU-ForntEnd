import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { formInfo } from '../../../../recoil/MakeForm/atom';
import { FormTitleWrapper, TitleInput } from './styles';
import TextArea from 'antd/es/input/TextArea';
import { QueWrapper } from '../MakeQueBase/styles';
import { useMutation, useQuery } from 'react-query';
import { editFormInfo } from '../../../../api/editForm';
import { debounce } from 'lodash-es';
import { useMessage } from '../../../../hooks/useMessage';
import { useLocation } from 'react-router-dom';
import { initialChat } from '../../../../recoil/Chatbot/atom';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Img, ImgUpload } from '../../DirectResForm/DescriptionTypes/Image/styles';
import Button from '../../../ui/Button';
import { ResDescription } from '../../../../typings/resForm';
import { color } from '../../../../recoil/Color/atom';
import { ImgArea } from '../../../../pages/MakeForm/Direct/styles';
import { changeUrl } from '../../../../api/user';
import ResFormInfo from '../../DirectResForm/ResFormInfo';

interface Props {
  isEdit?: boolean;
  formId?: string;
}

export default function FormTitle({ isEdit, formId }: Props) {
  const [info, setInfo] = useRecoilState(formInfo);
  const { mutate, isLoading, error, isError } = useMutation(() => editFormInfo(1, +formId!, info.title, info.content));
  const { showMessage, contextHolder } = useMessage();
  const { pathname, state } = useLocation();

  const [sendInitMessage, setSendInitMessage] = useRecoilState(initialChat);

  const { mutate: imageMutate } = useMutation(changeUrl, {
    onSuccess: (data) => {
      const temp = JSON.parse(JSON.stringify(info));
      temp.fimage = data.url;
      setInfo(temp);
    },
  });

  const onEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  }, []);

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > 500) {
        showMessage('warning', '글자 수가 너무 많아요');
        return;
      }
      setInfo({ ...info, title: e.target.value });
    },
    [info]
  );

  const onChangeContent = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.length <= 300) setInfo({ ...info, content: e.target.value });
    },
    [info]
  );

  const onBlur = useCallback(
    debounce(() => {
      if (pathname.slice(1, 16) !== 'mypage/editform') return;

      if (isEdit) {
        mutate();
      }
      showMessage('success', '업데이트 완료!');
    }, 1000),
    [isEdit, info]
  );

  const [images, setImages] = useState<{ dataURL: string; file: File }[]>([]);
  const { blue } = useRecoilValue(color);
  const maxNumber = 1;

  const onChange = useCallback(
    (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
      // data for submit
      setImages(imageList as never[]);
    },
    [images]
  );

  const deleteImg = useCallback(() => {
    const temp = JSON.parse(JSON.stringify(info));
    temp.fimage = '';
    setInfo(temp);
  }, [info]);

  useEffect(() => {
    if (images.length >= 1) {
      imageMutate({ image: images[0].file });
    }
  }, [images]);

  useEffect(() => {
    if (state && sendInitMessage.length >= 2) {
      setInfo({ title: sendInitMessage[0].message, content: sendInitMessage[1].message });
    }

    // messsage 다시 초기화
    setSendInitMessage([]);
  }, []);

  if (pathname.slice(1, 10) === 'directres') {
    return <ResFormInfo />;
  }

  return (
    <QueWrapper style={{ backgroundColor: '#F5F5F5' }}>
      {contextHolder}
      <FormTitleWrapper>
        <TitleInput
          value={info.title}
          onChange={onChangeTitle}
          onBlur={onBlur}
          onKeyPress={onEnter}
          placeholder={'설문 제목 입력'}
          required
        />
        {pathname.slice(1, 16) === 'mypage/editform' && info.fimage && <img src={info.fimage} alt="이미지" />}
        {pathname.slice(1, 16) === 'makeform/direct' && (
          <ImgArea>
            <ImageUploading
              acceptType={['jpg', 'jpeg', 'png']}
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  {images[0] === undefined && (
                    <ImgUpload
                      type={'button'}
                      style={isDragging ? { border: `2px dotted ${blue}` } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      클릭 혹은 드래그
                    </ImgUpload>
                  )}
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <Img src={image.dataURL} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <Button
                          type={'button'}
                          onClick={() => onImageUpdate(index)}
                          color={'black'}
                          bgColor={blue}
                          fontSize={1.6}
                          width={7}
                          height={3.5}
                        >
                          수정
                        </Button>
                        <Button
                          type={'button'}
                          onClick={() => {
                            onImageRemove(index);
                            deleteImg();
                          }}
                          color={'black'}
                          bgColor={blue}
                          fontSize={1.6}
                          width={7}
                          height={3.5}
                        >
                          삭제
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </ImgArea>
        )}

        <TextArea
          showCount
          maxLength={300}
          style={{ height: 80, resize: 'none' }}
          value={info.content}
          onChange={onChangeContent}
          onBlur={onBlur}
          placeholder="설문 설명"
          required
        />
      </FormTitleWrapper>
    </QueWrapper>
  );
}
