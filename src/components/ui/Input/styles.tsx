import styled from 'styled-components';
import { Input } from './index';

type input = Pick<Input, 'width' | 'height'>;

export const BaseInput = styled.input<input>`
  background-color: rgba(232, 211, 255, 0.2);
  border: 1.5px solid #c4c4c4;
  border-radius: 1.6rem;

  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;

  &:focus {
    outline: none;
  }
`;
