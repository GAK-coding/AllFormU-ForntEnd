import styled from 'styled-components';

export const BaseGbBoxWrapper = styled.section`
  width: 70%;
  margin: 0 auto;
  margin-top: 3rem;

  border: 1px solid var(--color-light-purple);
  border-radius: 7rem;

  background-color: rgba(232, 211, 255, 0.2);

  & > div {
    padding: 1rem 0;
    box-sizing: border-box;

    width: 100%;
    height: 78vh;

    display: flex;
    align-items: center;
  }
`;
