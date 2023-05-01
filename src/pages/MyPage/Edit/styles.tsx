import styled from 'styled-components';

export const EditPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem;
`;

export const SetUserImage = styled.div`
  width: 30rem;
  height: 45rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  padding: 2rem;
  margin: 2rem 0rem 2rem 2rem;

  border-radius: 3rem;
  background-color: rgba(232, 211, 255, 0.6);

  & > img {
    width: 65%;
    margin-top: 3rem;
  }

  & > div:first-of-type {
    font-size: 2.8rem;
    font-weight: 700;
    display: flex;
  }

  & > button:first-of-type {
    margin-top: 7rem;
    margin-bottom: 2rem;
  }
`;

export const InputWRapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div:first-of-type {
    margin-top: 6rem;
  }

  & > div {
    margin: 1rem 0rem 1rem 5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    & > span {
      width: 15%;
      font-size: 1.5rem;
      font-weight: 700;
      display: flex;
      justify-content: right;
      align-items: center;
    }

    & > input {
      margin-left: 4rem;
      display: flex;
      align-items: flex-start;
    }

    & > button {
      margin-left: 3rem;
      display: flex;
      align-self: flex-end;
      justify-content: center;
      justify-items: center;
    }
  }
`;

export const BtnBox = styled.nav`
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-left: 0 auto;

  & > button:first-of-type {
    margin-left: 10rem;
  }

  & > button {
    margin: 2rem 1rem 0rem 1rem;
  }
`;
