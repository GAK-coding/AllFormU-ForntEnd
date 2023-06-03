import styled from 'styled-components';

export const EditPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 50rem;
  margin: auto;
  padding: 3rem;
`;

export const SetUserImage = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  padding: 2rem;
  margin: 0rem 0rem 0rem 5rem;

  border-radius: 3rem;
  background-color: rgba(232, 211, 255, 0.6);

  & > div:first-of-type {
    margin-top: 2rem;
    font-size: 2.8rem;
    font-weight: 700;
    display: flex;
    color: #696969;
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > img {
      width: 80%;
      align-items: center;
      justify-content: center;
      margin-top: 5rem;
    }
    & > button {
      margin: 5rem 0rem 2rem 0rem;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  & > div:first-of-type {
    margin-top: 0rem;
  }

  & > div {
    margin: 3rem 0rem 1rem 3rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    & > span:first-of-type {
      width: 20%;
      font-size: 1.5rem;
      font-weight: 700;
      color: #696969;
      display: flex;
      justify-content: right;
      margin-right: 3rem;
    }
  }
`;

export const Line = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 3rem;
`;

export const BtnBox = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  margin: 0rem 4rem 4rem 0rem;
`;

export const StopUser = styled.section`
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  & > button {
    margin: 5rem 1rem 0rem 3rem;
  }
`;
