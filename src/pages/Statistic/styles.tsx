import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 20%;
  height: 100%;
  padding: 2rem;

  & > span:first-of-type {
    font-size: 3rem;
    font-weight: 700;
    color: black;
  }

  & > span {
    font-size: 2.8rem;
    font-weight: 700;
    color: #696969;
  }

  border: 1px solid black;
`;

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 80%;
  height: 100%;
  padding: 2rem;

  border: 1px solid black;
`;
