import styled from 'styled-components';

export const MyPageWrapper = styled.div`
  padding: 5rem;
  display: flex;
`;

export const UserInfo = styled.div`
  width: 30rem;
  height: 48rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  padding: 2rem;
  margin: 2rem 0rem 2rem 2rem;

  border-radius: 3rem;
  background-color: rgba(232, 211, 255, 0.6);

  img {
    width: 70%;
    margin-top: 3rem;
  }

  & > div:first-of-type {
    font-size: 3rem;
    font-weight: 700;
    display: flex;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > span:first-of-type {
      margin-top: 8rem;
      margin-bottom: 3rem;
      font-size: 1.8rem;
      font-weight: 500;
    }
    & > span {
      margin-bottom: 1rem;
      font-size: 1.8rem;
      font-weight: 500;
    }
  }
`;

export const FormWrapper = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BtnBox = styled.div`
  display: flex;

  & > button {
    margin-left: 48rem;
  }
`;

export const Form = styled.div`
  width: 90%;
  height: 20rem;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  padding: 2rem;

  margin: 3rem 1rem 0rem 8rem;
  border-radius: 3rem;
  background-color: #fefefe;

  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.5);
`;

export const Line = styled.button`
  width: 20%;
  display: flex;
  margin-left: 1rem;

  text-align: left;
  font-size: 1.6rem;
  font-weight: 700;

  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const AlignBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 2rem;
  margin-right: 2rem;
`;

export const FormBox = styled.button`
  flex-direction: row;
  justify-content: space-between;

  width: 55%;
  height: 6rem;

  border: 1px solid #dbdbdb;
  border-radius: 1.8rem;
  background-color: #fefefe;

  margin: 1rem 1rem 0.5rem 1rem;
  cursor: pointer;
`;
