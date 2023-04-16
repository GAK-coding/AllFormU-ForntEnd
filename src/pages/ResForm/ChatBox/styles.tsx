import styled from 'styled-components';

export const BallonWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 1rem 2rem 2rem 1rem;
  padding: 2rem;
  font-weight: 700;
  font-size: 1.2rem;

  & > img {
    width: 15%;
  }

  & > div {
    max-width: 50%;

    border-radius: 5rem;
    box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);

    & > span {
      display: flex;
      align-items: center;
      padding: 0.5rem;
    }
  }
`;
export const UserBallon = styled.div`
  align-self: flex-start;
  background-color: #f7e9a6;
`;

export const BotBallon = styled.div`
  align-self: flex-end;
  background-color: #eeeeee;
`;
