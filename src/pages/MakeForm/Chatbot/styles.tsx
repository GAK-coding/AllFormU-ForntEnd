import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ViewWrapper = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: self-start;
  margin: auto;

  padding: 4rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

export const ChatbotWrapper = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: 50% 50%;

  grid-template-rows: 50% 50%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: self-start;
  margin: auto;
`;

export const InPutWrapper = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 3rem;
`;
