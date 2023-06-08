import styled from 'styled-components';

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 4rem;

  height: 88vh;
  margin-top: -5rem;

  & > img {
    width: 15%;
  }

  & > span {
    font-size: 3rem;
    font-weight: 700;
    color: #696969;
  }
`;
