import styled from 'styled-components';

export const HomeWrapper = styled.section`
  display: flex;
  justify-content: center;

  margin-top: 10rem;
`;

export const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  width: 55%;
  height: 60vh;

  //border: 1px solid;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    //border: 1px solid;
    width: 70%;
    height: 100%;

    & > div {
      margin-bottom: 1.4rem;
    }
  }
`;

export const ExplanationAbove = styled.div`
  font-size: 5rem;
  font-weight: 700;

  & > span {
    color: var(--color-main);
  }
`;

export const ExplanationMiddle = styled.div`
  text-align: center;

  & > img {
    width: 100%;
  }
`;

export const ExplanationBelow = styled.div``;

export const Img = styled.div`
  box-sizing: border-box;
  //border: 1px solid;
  width: 45%;

  display: flex;
  align-items: center;

  & > img {
    width: 50%;
  }
`;
