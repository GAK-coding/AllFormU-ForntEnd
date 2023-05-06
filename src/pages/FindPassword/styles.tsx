import styled from 'styled-components';

export const FindWrapper = styled.section`
  width: 35%;
  margin: 0 auto;
  margin-top: 10rem;

  border: 1px solid var(--color-light-purple);
  border-radius: 6rem;
  background-color: rgba(232, 211, 255, 0.2);

  font-weight: 700;

  & > div {
    padding: 1rem 0;
    box-sizing: border-box;

    width: 100%;
    height: 50vh;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -5.3rem;

  img {
    width: 50%;
  }
`;

export const InputId = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 4rem;

  & > span {
    font-size: 2.4rem;
    margin-bottom: 4rem;
  }

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;

    font-size: 1.5rem;
    & > span {
      margin-right: 1.5rem;
    }
    & > input {
      margin-right: 1rem;
      background-color: inherit;
    }
  }
`;

export const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 4.5rem;

  & > span {
    margin-bottom: 1rem;
    font-size: 1.6rem;
    color: #696969;
  }

  & > button {
    margin-top: 3rem;
  }
`;
