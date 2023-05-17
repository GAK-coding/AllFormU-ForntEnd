import React from 'react';
import { ImageWrapper, Img, ImgUpload } from './styles';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from '../../../../../recoil/Color/atom';
import Button from '../../../../ui/Button';

export default function Image() {
  const [images, setImages] = React.useState([]);
  const { blue } = useRecoilValue(color);
  const maxNumber = 1;

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

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
            {/* &nbsp; */}
            {/* <button type={'button'} onClick={onImageRemoveAll}> */}
            {/*   Remove all images */}
            {/* </button> */}
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
                    onClick={() => onImageRemove(index)}
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
