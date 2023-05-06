import styled from 'styled-components';
import { BaseGbBoxWrapper } from '../../components/ui/BaseBgBox/styles';

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
  display: flex;
  flex-direction: column;
  justify-content: center;

  // TODO : 마지막에 밑에부분 이상함
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

export const FormBox = styled(BaseGbBoxWrapper)`
  width: 60%;
  height: 14rem;
  border-radius: 3rem;
  border: none;
  background-color: rgba(232, 211, 255, 0.3);

  box-shadow: 2px 4px 15px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 2px 4px 15px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 2px 4px 15px 0px rgba(0, 0, 0, 0.2);

  margin-top: 2rem;

  display: flex;
  flex-direction: row;

  & div {
    width: 70rem;
  }

  & > button:first-of-type {
    border-radius: 2rem;
    align-self: center;
  }
`;

export const Title = styled.div`
  padding: 2rem;
  font-weight: 700;

  & > div:first-of-type {
    display: flex;
    flex-direction: column;
    margin-left: 5rem;
    font-size: 2.5rem;
    margin-top: 2rem;
    align-self: self-start;

    & > span {
      font-size: 1.8rem;
      color: #696969;
      margin: 1.5rem 0rem 0rem 3.5rem;
    }
  }
`;

export const ButtonWrapper = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;

  & > button {
    border-radius: 2rem;
  }

  & > button:first-of-type {
    margin: 2rem 0rem 1.5rem 0rem;
  }
`;

export const ButtonView = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;

  & > button {
    border-radius: 2rem;
    margin-top: 4rem;
  }
`;
