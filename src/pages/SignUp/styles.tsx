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
  justify-content: flex-start;
  align-items: center;

  margin-left: 5rem;
  margin-bottom: 1.5rem;

  & > span {
    width: 15%;
    font-weight: 700;
    font-size: 1.5rem;
    display: flex;
    justify-content: right;
    margin-right: 4rem;
  }

  & > button {
    margin-left: 4rem;
    display: flex;
    align-self: flex-end;
    justify-content: center;
    justify-items: center;
  }
`;

export const LoginLine = styled.div`
  width: 90%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 4rem;

  & > span {
    width: 15%;
    font-weight: 700;
    font-size: 1.5rem;
    display: flex;
    justify-content: right;
    margin-right: 4rem;
  }
`;
export const Match = styled.span`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1daa8b;
`;

export const MisMatch = styled.span`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #f36767;
`;

export const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  img {
    width: 15%;
    margin-right: 1.5rem;
  }

  & > button {
    margin: 2rem 0rem 0rem 0rem;
  }

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

export const LoginBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 3rem;

  & > button:first-of-type {
    margin-bottom: 3rem;
  }
`;
