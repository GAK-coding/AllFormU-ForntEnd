import styled from 'styled-components';

export const HomeWrapper = styled.section`
  display: flex;
  justify-content: center;

  margin-top: 10rem;

  //& > div {
  //  width: 50%;
  //}
`;

export const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  width: 60%;

  //border: 1px solid;

  & > div {
    //border: 1px solid;

    display: flex;
    flex-direction: column;
    align-items: center;

    //padding-right: 2rem;

    & > div {
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
  text-align: center;

  & > img {
    width: 70%;
  }
`;

export const ExplanationBelow = styled.div``;

export const Img = styled.div`
  box-sizing: border-box;
  //padding-left: 8rem;

  width: 40%;

  & > img {
    width: 50%;
  }
`;
