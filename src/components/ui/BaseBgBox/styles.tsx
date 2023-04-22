import styled from 'styled-components';

export const BaseGbBoxWrapper = styled.section`
  width: 70%;
  min-height: 80vh;
  margin: 0 auto;
  margin-top: 4rem;

  border: 1px solid var(--color-light-purple);
  border-radius: 9rem;

  background-color: rgba(232, 211, 255, 0.2);

  & > div {
    padding: 5rem;
    box-sizing: border-box;

    width: 100%;
    height: 80vh;

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;
