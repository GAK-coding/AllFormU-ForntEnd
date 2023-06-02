import styled from 'styled-components';
import { BaseInput } from '../../components/ui/Input/styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 4rem;
`;

export const ViewWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  margin: auto;

  padding-top: 2rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

export const InPutWrapper = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 2rem;
`;

export const FunctionWrapper = styled.div`
  width: 35%;
  height: 100%;
  padding: 2rem;
  margin-left: 2rem;

  box-sizing: border-box;
  border-radius: 3rem;
  background-color: rgba(232, 211, 255, 0.6);

  display: flex;
  flex-direction: column;
`;

export const FunctionTitle = styled.div`
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    display: flex;
    font-weight: 700;
    font-size: 1.4rem;
    color: #696969;
  }
`;

export const FunctionContent = styled.div`
  height: 70%;
  padding: 1.5rem 1.2rem 0rem 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserResWrapper = styled.div`
  width: 65%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: row;
  margin-left: 3rem;
  margin-right: 5rem;
  box-sizing: border-box;
  border-radius: 3rem;
  background-color: #f7e9a6;
`;

export const UserInput = styled.form`
  width: 100%;
  height: 80%;

  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: center;
  margin: 0rem 1rem 0rem 2rem;

  & > input {
    width: 80%;
    outline: none;
    letter-spacing: 0.2rem;
    font-weight: 600;
    background-color: transparent;

    margin-right: 1rem;

    box-sizing: border-box;
    border-radius: 2rem;
    border: 2px solid #fefefe;
  }
`;

export const SubmitBtn = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
