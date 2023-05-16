import styled from 'styled-components';

export const MyPageWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  margin: 0 auto;

  width: 90%;
  height: 90%;

  position: relative;
`;

export const UserInfo = styled.div`
  width: 35%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 90%;
    max-width: 32rem;
    height: 90%;

    box-sizing: border-box;
    padding: 2rem;

    border-radius: 3rem;
    background-color: rgba(232, 211, 255, 0.6);

    img {
      width: 70%;
      margin-top: 5rem;
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
        margin-top: 4rem;
        margin-bottom: 3rem;
        font-size: 1.8rem;
        font-weight: 700;
      }
      & > span {
        margin-bottom: 1rem;
        font-size: 1.6rem;
        font-weight: 600;
      }
    }
  }
`;

export const FormWrapper = styled.div`
  width: 65%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const BtnBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  margin: auto;

  height: 15%;
  top: -2rem;
  right: 0;
`;

export const Form = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */

  width: 85%;
  height: 45%;
  margin: 0 auto;
  /* margin-top: 2rem; */

  box-sizing: border-box;
  padding: 2rem;
  border-radius: 3rem;
  background-color: #fefefe;

  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.1);

  & > span {
    position: absolute;

    font-size: 2.5rem;
    color: var(--color-light-purple);

    top: 1rem;
    right: 1.5rem;

    cursor: pointer;
  }
`;

export const Line = styled.div`
  display: flex;
  margin-left: 1rem;
  margin-bottom: 1rem;

  text-align: left;
  font-size: 1.6rem;
  font-weight: 700;
`;

export const AlignBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60%;
  width: 90%;
  margin-left: 2rem;
  margin-right: 2rem;
`;

export const FormBox = styled.button`
  flex-direction: row;

  width: 45%;
  height: 6rem;

  border: 1px solid #dbdbdb;
  border-radius: 1.8rem;
  background-color: #fefefe;

  margin: 1rem 1rem 0.5rem 1rem;
  cursor: pointer;

  font-weight: 600;
  color: #696969;
`;
