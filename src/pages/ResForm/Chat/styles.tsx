import styled from 'styled-components';

export const ChatBot = styled.div`
  display: flex;

  img {
    margin-left: 4rem;
    margin-top: 4rem;
    width: 8%;
  }

  div {
    border-radius: 10rem;

    background-color: #eeeeee;
    box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
    margin-top: 4rem;
    margin-left: 2rem;
    //margin-right: 4rem;

    span {
      padding: 3rem;
      font-weight: 600;
    }
  }
`;
export const User = styled.div`
  display: flex;

  div {
    border-radius: 10rem;
    background-color: #f7e9a6;
    box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);

    span {
      padding: 3rem;
      font-weight: 600;
    }
  }
`;
