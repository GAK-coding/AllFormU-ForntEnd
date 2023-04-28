import styled from 'styled-components';

export const PageInfo = styled.div`
  width: 30%;
  height: 90%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  padding: 2rem;
  margin-left: 6rem;

  border-radius: 3rem;
  background-color: rgba(232, 211, 255, 0.6);

  & > div:first-of-type {
    font-size: 5.5rem;
    font-weight: 700;
  }

  & > div:last-of-type {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > span {
      margin-top: 4rem;

      font-size: 3rem;
      font-weight: 700;
    }
  }

  img {
    width: 60%;
  }
`;

export const Form = styled.form`
  width: 60%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Line = styled.div`
  width: 90%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;

  font-size: 1.6rem;
  font-weight: 700;

  & > div {
    width: 20%;

    margin-right: 4rem;
    text-align: right;
  }
`;

export const Match = styled.span`
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #00c126;
`;

export const MisMatch = styled.span`
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #e61010;
`;
