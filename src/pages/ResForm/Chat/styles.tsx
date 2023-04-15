import styled from 'styled-components';

export const ChatBox = styled.div<{ type: string }>`
  display: flex;
  font-weight: 600;
  border-radius: 10rem;
  padding: 1rem 2rem;

  background-color: ${(props) => (props.type === 'user' ? '#F7E9A6' : '#EEEEEE')};
  box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);

  margin: ${(props) => (props.type === 'user' ? '2rem 4rem 1.5rem 30rem' : '0rem 30rem 1.5rem 2rem')};

  img {
    width: ${(props) => (props.type === 'user' ? '40%' : '80%')};
  }
`;

export const lChatBox = styled.div<{ type: string }>`
  display: flex;
  font-weight: 700;
  margin: 1.5rem 4rem;
  border-radius: 5rem;
  background-color: ${(props) => (props.type === 'user' ? '#F7E9A6' : '#EEEEEE')};
  padding: 1rem 2rem;
  box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
  & > div:first-of-type {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    & > img {
      border-radius: 50%;
      width: ${(props) => (props.type === 'user' ? '40%' : '36.5%')};
      margin-bottom: 0.5rem;
    }
  }
  & > span {
    width: 80%;
    display: flex;
    align-items: center;
  }
`;
