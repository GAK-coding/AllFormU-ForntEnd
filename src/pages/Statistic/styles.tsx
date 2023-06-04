import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  padding: 2rem 10rem 0 10rem;
`;

export const InfoWrapper = styled.div`
  position: fixed;

  left: 120px;
  bottom: 105px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 20%;
  height: 70%;
  padding: 2rem;
  margin-top: 1rem;
  margin-left: 5rem;

  & > span {
    width: 80%;
    margin: 3rem 0rem 5rem 0rem;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: #2d2d2d;
  }

  & > img {
    width: 200px;
    margin-bottom: 5rem;
  }

  box-sizing: border-box;
  border-radius: 3rem;
  background-color: rgba(232, 211, 255, 0.2);
  border: 3px solid rgba(232, 211, 255, 1);
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
  margin-bottom: 1.5rem;

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

  padding: 1rem;
  margin-left: 30rem;
`;

export const QueWrapper = styled.div`
  width: 80%;

  padding: 5rem;
  margin-bottom: 5rem;

  box-sizing: border-box;
  border-radius: 3rem;
  background-color: rgba(232, 211, 255, 0.2);
`;
export const QueTitle = styled.div`
  width: 80%;
  display: flex;
  font-size: 1.8rem;
  font-weight: 700;
  color: #282c34;
  margin-bottom: 2rem;
  text-align: left;

  & > span {
    color: #696969;
  }
`;

export const ResTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
  font-weight: 700;
  color: #696969;
  margin-bottom: 4rem;
`;
export const ChartBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > button {
    margin: 0 2rem;
  }
`;
export const QueChart = styled.div`
  margin-top: 4rem;
  box-sizing: border-box;
  border-radius: 3rem;
  background-color: #ffffff;
`;
