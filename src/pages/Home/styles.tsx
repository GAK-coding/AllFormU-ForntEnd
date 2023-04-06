import styled from 'styled-components';

export const HomeWrapper = styled.section`
  display: flex;
  justify-content: center;

  margin-top: 10rem;
`;

export const Explanation = styled.div`
  width: 45%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  margin-right: 10rem;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > div {
      margin: 0 auto;
      margin-bottom: 1.4rem;
    }
  }
`;

export const ExplanationAbove = styled.div`
  font-size: 3.5rem;
  font-weight: 700;

  & > span {
    color: var(--color-main);
  }
`;

export const ExplanationMiddle = styled.div`
  font-size: 8rem;
  font-weight: 700;
`;

export const ExplanationBelow = styled.div``;

export const Img = styled.div`
  width: 45%;
  box-sizing: border-box;

  & > img {
    width: 60%;
  }
`;
