import styled from 'styled-components';

export const SectionBoxWrapper = styled.div`
  //border: 3px solid var(--color-gray);
  border: none;
  border-radius: 4rem;

  width: 90%;
  margin: 0 auto;
  margin-bottom: 2rem;
  padding: 2rem 2rem 1rem 2rem;

  & > div:first-of-type {
    display: flex;
    justify-content: space-evenly;

    padding: 1rem 0 3rem 0;

    & > span {
      font-size: 1.5rem;
      font-weight: 700;
      color: #696969;

      & > span {
        margin-right: 0.5rem;
      }
    }
  }
`;
