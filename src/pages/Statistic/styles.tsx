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

  & > span {
    margin: 10rem 0rem 5rem 0rem;
    font-size: 3rem;
    font-weight: 700;
    color: black;
  }

  & > img {
    width: 70%;
    margin-bottom: 8rem;
  }

  //border: 1px solid black;
`;

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: auto;
  font-size: 1.5rem;
  font-weight: 700;

  & > span {
    width: 20%;
    margin-right: 2rem;
  }
  color: #696969;
`;

export const Date = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  font-size: 1.5rem;
  font-weight: 700;
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
