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
    width: 80%;
    margin: 7rem 0rem 5rem 0rem;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    color: #2d2d2d;
  }

  & > img {
    width: 70%;
    margin-bottom: 5rem;
  }
`;

export const HeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  font-size: 1.5rem;
  font-weight: 700;

  & > span {
    width: 100%;
    margin-bottom: 1rem;
  }
  color: #696969;
`;

export const Info = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 3rem;

  font-size: 1.5rem;
  text-align: left;
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
