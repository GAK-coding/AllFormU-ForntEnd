import styled from 'styled-components';

export const SignUpWrapper = styled.div`
  padding: 5rem;
  display: flex;
`;

export const PageInfo = styled.div`
  width: 30%;
  height: 45rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  padding: 2rem;
  margin-right: 2rem;

  border-radius: 3rem;
  background-color: rgba(232, 211, 255, 0.6);

  & > div:first-of-type {
    font-size: 5rem;
    font-weight: 700;
  }

  & > div:last-of-type {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > span {
      margin-top: 4rem;

      font-size: 2.4rem;
      font-weight: 700;
    }
  }

  img {
    width: 50%;
  }
`;

export const Form = styled.form`
  width: 65%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Line = styled.div`
  width: 80%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  & > div {
    width: 10rem;

    margin-right: 4rem;
    text-align: right;

    & > span {
      font-size: 1.6rem;
    }
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
