import styled from 'styled-components';

export const BallonChatWrapper = styled.div`
  border: 2px solid red;
  max-width: 50%;

  display: flex;
`;

export const BallonChatWrapperLeft = styled.div`
  position: relative;
  font-family: sans-serif;
  font-size: 16px;
  line-height: 2.4rem;
  width: auto;
  background: #fff;
  border-radius: 4rem;
  padding: 2rem;
  text-align: center;
  color: #000;
  background-color: #61dafb;
  margin-bottom: 3rem;
  word-wrap: break-word;

  margin-left: 1rem;

  & > span {
    border: 1px solid;
  }

  &:before {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 24px solid #61dafb;
    border-right: 12px solid transparent;
    border-top: 12px solid #61dafb;
    border-bottom: 20px solid transparent;
    left: -5px;
    bottom: -20px;
    transform: rotate(30deg);
  }
`;

export const BallonChatWrapperRight = styled.div`
  position: relative;
  font-family: sans-serif;
  font-size: 1.6rem;
  line-height: 2.4rem;
  max-width: 50%;
  background: #fff;
  border-radius: 40px;
  padding: 2rem;
  text-align: center;
  color: #000;
  background-color: #f72585;
  margin-bottom: 3rem;
  word-wrap: break-word;
  margin-right: 1rem;

  &:before {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    border-right: 24px solid #f72585;
    border-left: 12px solid transparent;
    border-top: 12px solid #f72585;
    border-bottom: 20px solid transparent;
    right: -5px;
    bottom: -20px;
    transform: rotate(-30deg);
  }
`;
