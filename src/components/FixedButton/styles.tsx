import styled from 'styled-components';

export const FloatButton = styled.button`
  & > img:first-of-type {
    width: 75%;
  }

  & > span {
    font-weight: 800;
    font-size: 1.5rem;
    margin-top: -1rem;
    color: #2d2d2d;
  }

  width: 100px;
  height: 100px;

  position: absolute;
  right: 30px;
  bottom: 30px;

  border-radius: 50%;
  border: none;

  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);

  cursor: pointer;
`;
