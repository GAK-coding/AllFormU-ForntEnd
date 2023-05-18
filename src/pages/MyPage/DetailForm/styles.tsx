import styled from 'styled-components';
import { BaseGbBoxWrapper } from '../../../components/ui/BaseBgBox/styles';

export const HeaderWrapper = styled.div`
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    margin: 2rem 0rem 2rem 0rem;
    font-size: 3rem;
    font-weight: 800;
    color: #2d2d2d;
  }
`;

export const FormListWrapper = styled.div`
  & > div {
    background-color: var(--color-light-purple-30);
    width: 90%;
    height: 14rem;

    margin: 0 auto;
    border-radius: 3rem;
    margin-bottom: 2rem;

    display: flex;

    & > div {
      width: 50%;
    }
  }
`;

export const FormBox = styled(BaseGbBoxWrapper)`
  //width: 60%;
  //height: 14rem;
  //border-radius: 3rem;
  //border: none;
  //background-color: rgba(232, 211, 255, 0.3);
  //
  //margin-top: 2rem;
  //
  //display: flex;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  padding-left: 4rem;
  box-sizing: border-box;

  & > span:first-of-type {
    font-weight: 700;
    font-size: 2.5rem;
  }

  & > span:last-of-type {
    font-size: 1.8rem;
    color: #696969;
    margin-top: 1.8rem;
    margin-left: 2rem;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: auto;
  padding-right: 2rem;

  & > div:first-of-type {
    height: 100%;

    display: flex;
    flex-direction: row;
    & > button {
      margin-right: 1rem;
    }
  }

  & > div:last-of-type {
    display: flex;
    & > button {
      margin-left: 1rem;
    }
  }
`;

export const ButtonView = styled.div``;
