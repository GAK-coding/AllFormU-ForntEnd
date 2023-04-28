import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 2rem 2rem;

  height: 6vh;

  img {
    width: 60%;
  }
`;

export const Title = styled.div`
  & > a {
    color: var(--color-main);
    font-size: 2rem;
    font-weight: 700;
  }
`;

export const BtnBox = styled.nav`
  display: flex;

  & > button {
    margin-left: 2rem;
  }
`;
