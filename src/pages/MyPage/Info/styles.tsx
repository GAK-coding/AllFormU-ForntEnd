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
        font-size: 1.6rem;
        font-weight: 600;
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
  display: flex;
  justify-content: flex-end;

  height: 8%;

  position: absolute;
  top: -2.5rem;
  right: 0;
`;

export const Form = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 90%;
  height: 45%;
  margin: 0 auto;

  box-sizing: border-box;
  padding: 2rem;

  border-radius: 3rem;
  background-color: #fefefe;

  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.5);

  & > span {
    position: absolute;
    cursor: pointer;

    font-size: 2.5rem;
    color: var(--color-light-purple);

    top: 1rem;
    right: 1.5rem;
  }
`;

export const Line = styled.div`
  display: flex;
  margin-left: 1rem;

  text-align: left;
  font-size: 1.6rem;
  font-weight: 700;

  background-color: transparent;
  cursor: pointer;
`;

export const AlignBox = styled.div`
  height: 90%;

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
