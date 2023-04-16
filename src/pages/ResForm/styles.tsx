import styled from 'styled-components';
import { BaseGbBoxWrapper } from '../../components/ui/BaseBgBox/styles';

export const ChatbotResWrapper = styled(BaseGbBoxWrapper)`
  height: 58rem;
  border-radius: 3rem;
  border: none;
`;

export const Chatting = styled.div`
  //display: flex;
  display: block;
  height: 75%;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

export const ChattingBottom = styled.div`
  display: flex;
  height: 25%;
  flex-direction: row;
`;

export const ChatbotFunc = styled.div`
  display: flex;
  flex-direction: row;

  width: 35%;
  height: 12rem;
  padding: 2rem;
  margin-left: 7rem;

  box-sizing: border-box;
  border-radius: 3rem;
  background-color: rgba(232, 211, 255, 0.6);
`;

export const Line = styled.div`
  display: flex;
  text-align: center;
  font-weight: 700;
  font-size: 1.2rem;

  margin-top: 2.2rem;
  margin-left: 1rem;
  line-height: 2.2rem;
`;

export const BtnBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-left: 1.8rem;
`;

export const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & > button:first-of-type {
    margin-right: 2rem;
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
  width: 5rem;
  height: 2rem;
  margin-left: 45rem;
  //margin-top: -2.3rem;
  cursor: pointer;
  background-color: transparent;
  border-color: transparent;
`;
