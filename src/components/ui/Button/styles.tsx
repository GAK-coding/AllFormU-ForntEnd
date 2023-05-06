import styled from 'styled-components';
import { ButtonProps } from './index';

type Btn = Omit<ButtonProps, 'text'>;

export const BtnWrapper = styled.button<Btn>`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: ${(props) => (props.radius ? props.radius : 5)}rem;
  border: transparent;
  padding: 1rem 2rem;
  cursor: pointer;

  width: ${(props) => (typeof props.width === 'string' ? props.width : props.width + 'rem')};
  height: ${(props) => (typeof props.height === 'string' ? props.height : props.height + 'rem')};

  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  font-size: ${(props) => props.fontSize}rem;
  font-weight: 700;

  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.1);

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
