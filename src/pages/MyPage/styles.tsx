import styled from 'styled-components';

export const MyPageWrapper = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;

  & > div:first-of-type {
    margin-left: 3.5rem;
    font-size: 3rem;
    font-weight: 700;
    display: flex;
    flex-direction: row;

    & > button {
      margin-left: 65rem;
    }
  }

  // 하단 박스 스타일
  & > div:last-of-type {
    display: flex;
  }
`;

export const UserInfo = styled.div`
  width: 30%;
  height: 38rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  padding: 2rem;
  margin-top: 4.5rem;
  margin-left: 3.5rem;
  margin-right: 1rem;

  border-radius: 3rem;
  background-color: rgba(232, 211, 255, 0.6);

  img {
    width: 70%;
    margin-top: 1.8rem;
  }

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > span {
      margin-bottom: 2rem;

      font-size: 1.8rem;
      font-weight: 500;
    }
  }
`;

export const FormWrapper = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Form = styled.div`
  width: 52%;
  height: 27rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  padding: 2rem;
  margin-top: 3rem;
  margin-left: 3.5rem;
  margin-right: 1rem;

  border-radius: 3rem;
  background-color: #fefefe;
`;
