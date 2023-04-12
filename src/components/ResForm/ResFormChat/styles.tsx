import styled from 'styled-components';

export const ChatBox = styled.div<{ type: string }>`
  display: flex;

  font-weight: 700;
  margin: 0 1rem;
  margin-bottom: 1.5rem;
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
      width: 40%;

      margin-bottom: 0.5rem;
    }
  }

  & > span {
    width: 80%;

    display: flex;
    align-items: center;
  }
`;
