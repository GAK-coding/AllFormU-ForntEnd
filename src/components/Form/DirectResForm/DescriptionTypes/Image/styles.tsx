import styled from 'styled-components';

export const ImageWrapper = styled.div`
  .image-item__btn-wrapper {
    display: flex;
    justify-content: space-evenly;
    width: 40%;

    margin-top: 1rem;
  }
`;

export const ImgUpload = styled.button`
  border: 2px dotted #c4c4c4;

  width: 15rem;
  height: 15rem;
  background-color: inherit;
  font-size: 1.2rem;
  color: #282c34;
`;

export const Img = styled.img`
  width: 50%;
`;
