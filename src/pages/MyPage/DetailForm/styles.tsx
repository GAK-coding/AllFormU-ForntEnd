import styled from 'styled-components';
import { BaseGbBoxWrapper } from '../../../components/ui/BaseBgBox/styles';

export const HeaderWrapper = styled.div`
  height: 10rem;
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
    width: 80%;
    height: 16rem;

    margin: 0 auto;
    border-radius: 3rem;
    margin-bottom: 2rem;

    display: flex;

    padding: 2rem;

    & > div {
      width: 50%;
    }
  }
`;

export const BottomBox = styled.div`
  width: 100%;
  height: 4rem;
`;
export const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 2rem;
  padding-left: 4rem;
  box-sizing: border-box;

  & > span {
    margin-left: 2rem;
  }

  & > span:first-of-type {
    font-weight: 700;
    font-size: 2.5rem;
    margin-left: 0;
  }

  & > span:nth-child(2) {
    font-size: 1.8rem;
    color: #696969;
  }

  & > span:last-of-type {
    font-size: 1.4rem;
    color: #696969;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: auto;
  padding-right: 2rem;

  //border: 1px solid;
  height: 50%;
  position: relative;

  & > div:first-of-type {
    height: 100%;
    //border: 1px solid;

    display: flex;
    align-items: center;
    flex-direction: row;
    & > button {
      margin-right: 2rem;
    }
  }

  & > div:last-of-type {
    height: 100%;
    //border: 1px solid;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10%;

    margin-left: 1rem;

    & > span {
      color: #696969;
      font-weight: 600;
    }
  }

  & > span {
    position: absolute;
    bottom: -4rem;
    right: 4rem;

    color: #696969;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: #2196f3;
    }
  }
`;
