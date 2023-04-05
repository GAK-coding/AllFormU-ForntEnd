import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 2rem;
`;

export const Title = styled.div`
  & > a {
    color: var(--color-main);
    text-transform: capitalize;
    font-size: 4rem;
  }
`;

export const BtnBox = styled.div`
  display: flex;

  & > button {
    margin-left: 2rem;
  }
`;
