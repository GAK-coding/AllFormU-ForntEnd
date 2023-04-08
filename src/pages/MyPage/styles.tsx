import styled from 'styled-components';

export const MyPageWrapper = styled.div`
  padding: 5rem;
  display: flex;
  /* 
  & > div:first-of-type {
    margin-left: 3.5rem;
    font-size: 3rem;
    font-weight: 700;
    display: flex;
  } */

  /* // 하단 박스 스타일
  & > div:last-of-type {
    display: flex;
  } */
`;

export const UserInfo = styled.div`
  width: 30%;
  height: 48rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  padding: 2rem;
  margin-top: 2rem;
  margin-left: 3.5rem;
  margin-right: 1rem;

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
  width: 85%;
  height: 20rem;

  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */

  box-sizing: border-box;
  padding: 2rem;
  margin-top: 3rem;
  margin-left: 6rem;
  margin-right: 1rem;

  border-radius: 3rem;
  background-color: #fefefe;
`;

export const Line = styled.div`
  display: flex;
  margin-left: 1rem;
  text-align: left;
  font-size: 1.6rem;
  font-weight: 700;
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

  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;

  cursor: pointer;
`;
