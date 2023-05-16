import styled from 'styled-components';

export const GridBoxWrapper = styled.div<{ rowLen: number; colLen: number }>`
  border: 1px solid;

  width: 100%;
  min-height: 6rem;

  & > div {
  }
`;
