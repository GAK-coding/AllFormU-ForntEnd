import styled from 'styled-components';

export const MakeFormWrapper = styled.section`
  margin-top: 5rem;
  height: 60vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MakeFormTop = styled.div`
  text-align: center;
  font-weight: 700;

  & > div:first-of-type {
    font-size: 5rem;
    margin-bottom: 5rem;

    & > span {
      color: var(--color-main);
      font-size: 6.5rem;
    }
  }

  & > div:last-of-type {
    margin-bottom: 5rem;
    font-size: 3rem;
  }
`;

export const MakeFormBottom = styled.div`
  display: flex;
  gap: 8rem;

  & > button > span {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    & > img {
      width: 40%;
      margin-bottom: 1rem;
    }
  }

  & > button:hover {
    background-color: white;
    border: 1px solid var(--color-gray);
  }
`;
