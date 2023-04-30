import styled from 'styled-components';

export const ShortQuestionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  position: relative;

  & > div:first-of-type {
  }
`;

export const CheckMark = styled.div`
  position: absolute;
  top: 0rem;
  left: -3rem;

  width: 0.8rem;
  height: 100%;

  border-radius: 4rem 0 0 4rem;

  background-color: var(--color-sub-blue);
`;

export const ShortQueTop = styled.div`
  min-height: 6rem;

  display: flex;
`;

export const ShortQueBottom = styled.div``;

export const ShortQueTopLeft = styled.div`
  display: flex;
  align-items: center;

  width: 70%;
`;

export const ShortQueTopRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 30%;

  .custom-select .ant-select-selector {
    background-color: inherit;
    border-radius: 2rem;
    color: #696969;

    text-align: center;
  }

  & > span {
    font-size: 3rem;
    font-weight: 700;
    cursor: pointer;
  }
`;

export const ShortQueBottomLeft = styled.div`
  width: 70%;
  min-height: 6rem;

  height: 100%;
  box-sizing: border-box;

  display: flex;
  align-items: center;

  & > div {
    width: 25%;
    padding-left: 2rem;
    box-sizing: border-box;
  }
`;
