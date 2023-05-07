import styled from 'styled-components';
import { Input } from './index';

type input = Pick<Input, 'width' | 'height' | 'size'>;

export const BaseInput = styled.input<input>`
  background-color: rgba(232, 211, 255, 0.2);
  border: 1.5px solid #c4c4c4;
  border-radius: 1.6rem;

  width: ${(props) => (typeof props.width === 'string' ? props.width : props.width + 'rem')};
  height: ${(props) => (typeof props.height === 'string' ? props.height : props.height + 'rem')};
  font-size: ${(props) => props.size}rem;

  padding: 1rem;

  &:focus {
    outline: none;
  }
`;
