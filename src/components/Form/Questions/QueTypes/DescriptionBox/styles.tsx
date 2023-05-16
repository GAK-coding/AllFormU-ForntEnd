import styled from 'styled-components';
import { DESCRIPTION_LONG, DESCRIPTION_SHORT } from '../../../../../typings/makeForm';

export const Description = styled.div<{ type: string }>`
  display: flex;
  align-items: center;

  border: none;
  border-bottom: 1px solid #c4c4c4;

  width: ${(props) => (props.type === DESCRIPTION_SHORT || props.type === DESCRIPTION_LONG ? '75%' : '25%')};
  padding: 0.5rem;
  box-sizing: border-box;

  font-size: 1.6rem;
  font-weight: 700;
  color: #afafaf;

  & > span {
    display: flex;
    align-items: center;

    & > span {
      margin-right: 0.2rem;
    }
  }
`;
