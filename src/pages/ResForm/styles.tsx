import styled from 'styled-components';
import { BaseGbBoxWrapper } from '../../components/ui/BaseBgBox/styles';
export const ChatbotResWrapper = styled(BaseGbBoxWrapper)`
  //width: 70%;
  //min-height: 70rem;
  //border-radius: 3rem;
  //border: none;

  & > div {
    display: flex;
    flex-direction: column;

    & > div {
      //width: 100%;

      //border: 1px solid;
    }
  }
`;

export const Chatting = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  height: 75%;
  //border: 1px solid;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

export const ChattingBottom = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
`;

export const ChatbotFunc = styled.div`
  display: flex;
  flex-direction: row;

  width: 35%;
  height: 12rem;
  padding: 2rem;
  margin-left: 5rem;

  box-sizing: border-box;
  border-radius: 3rem;
  background-color: rgba(232, 211, 255, 0.6);
`;

export const Line = styled.div`
  display: block;
  text-align: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.2rem;

  margin-top: 0.7rem;
  //margin-left: 1rem;
  //margin-right: 1rem;
  padding: 1rem;
  line-height: 2.2rem;

  width: 30%;
`;

export const BtnBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  /* margin-left: 1.3rem; */

  width: 70%;
`;

export const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & > button:first-of-type {
    margin-right: 1.5rem;
  }
`;

export const UserRes = styled.div`
  display: flex;
  flex-direction: column;

  width: 60%;
  height: 12rem;
  padding: 2rem;
  margin-left: 3rem;
  margin-right: 5rem;

  box-sizing: border-box;
  border-radius: 3rem;
  background-color: #f7e9a6;
  //border: 3px solid #fefefe;

  & > span {
    display: flex;
    font-weight: 700;
    font-size: 2rem;
    text-align: center;
    align-items: center;
  }

  & > button {
    display: inline-block;
    float: right;
  }
`;

export const List = styled.button`
  display: inline-block;
  float: right;
  width: 5rem;
  height: 2rem;
  //margin-left: 45rem;
  //margin-top: -2.3rem;
  cursor: pointer;
  background-color: transparent;
  border-color: transparent;
`;
