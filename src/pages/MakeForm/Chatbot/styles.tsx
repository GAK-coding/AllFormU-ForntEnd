import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

export const ChatbotWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: self-start;
  margin-right: auto;
`;

export const BallonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  width: 100%;
`;

export const GAK = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  margin-top: auto;
  margin-bottom: 2.5rem;
  margin-right: 2rem;

  & > img {
    width: 100%;
    margin-bottom: 1rem;
  }

  & > span:first-of-type {
    font-size: 1.5rem;
    font-weight: 600;
    align-items: center;
    margin: auto;
  }
`;

export const ChatBallon = styled.div`
  position: relative;
  font-size: 16px;
  font-weight: 600;
  /* line-height: 2.4rem; */
  max-width: 75%;
  border-radius: 4rem;
  padding: 3rem;
  text-align: left;
  color: #2d2d2d;
  background: #eeeeee;
  margin-bottom: 1.5rem;
  word-wrap: break-word;

  margin-left: 1rem;

  & > span {
    border: 1px solid;
  }

  &:before {
    content: '';
    /* width: 0px;
    height: 0px; */
    position: absolute;
    border-left: 24px solid #eeeeee;
    border-right: 12px solid transparent;
    border-top: 12px solid #eeeeee;
    border-bottom: 20px solid transparent;
    left: -6px;
    bottom: -8px;
    transform: rotate(30deg);
  }
`;

export const UserWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: self-end;
  margin-left: auto;

  & > div {
    display: flex;
    flex-direction: row;
  }
`;

export const UserBallon = styled.div`
  position: relative;
  font-size: 16px;
  font-weight: 600;
  /* line-height: 2.4rem; */
  width: auto;
  background: #f7e9a6;
  border-radius: 4rem;
  padding: 2rem;
  text-align: center;
  color: #2d2d2d;
  background-color: #f7e9a6;
  margin-bottom: 3rem;
  word-wrap: break-word;
  margin-right: 1rem;

  & > span {
    border: 1px solid;
  }

  &:before {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    border-right: 24px solid #f7e9a6;
    border-left: 12px solid transparent;
    border-top: 12px solid #f7e9a6;
    border-bottom: 20px solid transparent;
    right: -5px;
    bottom: -20px;
    transform: rotate(-30deg);
  }
`;

export const InPutWrapper = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 3rem;
`;
