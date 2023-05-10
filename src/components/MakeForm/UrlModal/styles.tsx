import styled from 'styled-components';

export const UrlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;

  & > div {
    width: 90%;
    margin-top: 1rem;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    & > span {
      border: 1px solid #c4c4c4;
      border-radius: 3rem;
      padding: 0.5rem 2rem;
      font-weight: 700;
    }
  }
`;
