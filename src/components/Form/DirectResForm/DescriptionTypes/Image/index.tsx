import React, { useCallback, useEffect, useState } from 'react';
import { ImageWrapper, Img, ImgUpload } from './styles';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../../../../recoil/Color/atom';
import Button from '../../../../ui/Button';
import { changeUrl } from '../../../../../api/user';
import { useMutation } from 'react-query';
import { resDescriptionSets } from '../../../../../recoil/Resform/atom';
import { ResDescription } from '../../../../../typings/resForm';

interface Props {
  id: number;
}

export default function Image({ id }: Props) {
  const [resData, setResData] = useRecoilState(resDescriptionSets);
  const [idx, setIdx] = useState(-1);
  const [images, setImages] = useState<{ dataURL: string; file: File }[]>([]);
  const { blue } = useRecoilValue(color);
  const maxNumber = 1;

  const { mutate } = useMutation(changeUrl, {
    onSuccess: (data) => {
      const temp = JSON.parse(JSON.stringify(resData));
      (temp[idx] as ResDescription).content = data;
      setResData(temp);
    },
  });

  const onChange = useCallback(
    (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
      // data for submit
      setImages(imageList as never[]);
    },
    [images]
  );

  const deleteImg = useCallback(() => {
    const temp = JSON.parse(JSON.stringify(resData));
    (temp[idx] as ResDescription).content = '';
    setResData(temp);
  }, [resData]);

  useEffect(() => {
    if (images.length >= 1) {
      mutate({ image: images[0].file });
    }
  }, [images]);

  useEffect(() => {
    resData.find((que, index) => {
      if ('question_id' in que && que.question_id === id) setIdx(index);
    });
  }, [resData, idx]);

  return (
    <ImageWrapper>
      <ImageUploading acceptType={['jpg', 'jpeg', 'png']} value={images} onChange={onChange} maxNumber={maxNumber}>
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
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
    </ImageWrapper>
  );
}
