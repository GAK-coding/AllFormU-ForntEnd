import styled from 'styled-components';

export const HomeWrapper = styled.section`
  display: flex;
  justify-content: center;

  margin-top: 6rem;
`;

export const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  width: 60%;
  height: 60vh;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 70%;
    height: 100%;
  }
`;

export const ExplanationAbove = styled.div`
  font-size: 3rem;
  font-weight: 700;
  align-self: flex-start;
  display: flex;

  width: 100%;

  & > div {
    width: 15%;

    & > span {
      color: var(--color-main);
    }
  }

  & > div:nth-child(2) {
    width: 70%;
  }
`;

export const ExplanationMiddle = styled.div`
  text-align: center;
  display: flex;
  width: 100%;

  & > div {
    width: 10%;
  }

  & > div:nth-child(2) {
    width: 80%;

    & > img {
      width: 92%;
    }
  }
`;

export const ExplanationBelow = styled.div`
  margin-top: 4rem;
`;

export const Arrow = styled.div`
  display: flex;
  align-items: center;

  font-size: 2.5rem;
`;

export const Img = styled.div`
  box-sizing: border-box;
  width: 40%;

  display: flex;
  align-items: center;

  & > img {
    width: 55%;
  }
`;
